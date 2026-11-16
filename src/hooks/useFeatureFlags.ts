import { useState } from 'react';
import { FeatureFlags } from '../types';
import { getStoredItem, setStoredItem } from '../utils/storage';

const STORAGE_KEY = 'fb_feature_flags';

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableAudioChimes: true,
  enableSplitFlapAnimation: true,
  enableStrictRecoveryMode: true,
  enableEmergencyChecklist: true,
};

/**
 * Feature Flags architecture ready for drop-in Flagsmith client integration.
 * In production when Flagsmith is connected, this hook connects to flagsmith.hasFeature()
 * or flagsmith.getValue(). Currently evaluates with local override persistence.
 */
export function useFeatureFlags() {
  const [flags, setFlagsState] = useState<FeatureFlags>(() => {
    return getStoredItem<FeatureFlags>(STORAGE_KEY, DEFAULT_FEATURE_FLAGS);
  });

  const setFlag = (key: keyof FeatureFlags, value: boolean) => {
    const updated = { ...flags, [key]: value };
    setFlagsState(updated);
    setStoredItem(STORAGE_KEY, updated);
  };

  const isFeatureEnabled = (key: keyof FeatureFlags): boolean => {
    return Boolean(flags[key]);
  };

  const resetFlags = () => {
    setFlagsState(DEFAULT_FEATURE_FLAGS);
    setStoredItem(STORAGE_KEY, DEFAULT_FEATURE_FLAGS);
  };

  return {
    flags,
    setFlag,
    isFeatureEnabled,
    resetFlags,
    isFlagsmithConnected: false, // Explicit: ready for future provider connection
  };
}

