import { BigNumber } from 'bignumber.js';
import log from 'electron-log';

import { apiClient } from './index';
import Store from '@/store';

let refreshing = false, unlocking = false, disableUnlock = false;

export async function refreshHostWallet() {
	if (refreshing)
		return;

	try {
		refreshing = true;

		await loadHostWallet();
	} finally {
		refreshing = false;
	}
}

async function unlockHostWalllet(password) {
	if (unlocking || disableUnlock)
		return;

	try {
		unlocking = true;

		const resp = await apiClient.unlockWallet(password);

		if (resp.statusCode !== 200)
			throw new Error(resp.body.message);

		log.info('unlocked wallet');
	} catch (ex) {
		log.error(ex.message);
		disableUnlock = true;
	} finally {
		unlocking = false;
	}
}

async function loadHostWallet() {
	const config = Store.state.config || {},
		resp = await apiClient.getWallet(),
		alerts = [];

	if (resp.statusCode !== 200)
		throw new Error(resp.body.message);

	if (!resp.body.unlocked && resp.body.encrypted && !resp.body.rescanning && config.siad_wallet_password && !disableUnlock) {
		await unlockHostWalllet(config.siad_wallet_password);
		await loadHostWallet();
		return;
	}

	if (!resp.body.unlocked) {
		alerts.push({
			severity: 'danger',
			icon: 'wallet',
			message: 'Wallet is not unlocked. Wallet must be unlocked to form new contracts'
		});
	}

	Store.dispatch('hostWallet/setAlerts', alerts);
	Store.dispatch('hostWallet/setUnlocked', resp.body.unlocked);
	Store.dispatch('hostWallet/setEncrypted', resp.body.encrypted);
	Store.dispatch('hostWallet/setRescanning', resp.body.rescanning);
	Store.dispatch('hostWallet/setHeight', resp.body.height);
	Store.dispatch('hostWallet/setBalance', new BigNumber(resp.body.confirmedsiacoinbalance));
	Store.dispatch('hostWallet/setBalanceDelta', new BigNumber(resp.body.unconfirmedincomingsiacoins).minus(resp.body.unconfirmedoutgoingsiacoins));
}