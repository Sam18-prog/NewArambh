export interface MobileInputState {
  // Analog movement components in camera-local space:
  // x: -1.0 (left) to +1.0 (right)
  // z: -1.0 (backward) to +1.0 (forward)
  joystickX: number;
  joystickZ: number;
  isJoystickActive: boolean;

  // Touch sprint active
  touchSprint: boolean;

  // Touch jump active
  touchJump?: boolean;

  // Accumulated touch look rotation deltas (in radians)
  touchLookYaw: number;
  touchLookPitch: number;

  // Whether exploration is paused
  isPaused: boolean;
}

export interface TouchControlSettings {
  touchLookSensitivity: number; // default: 0.0035
  invertY: boolean; // default: false
  joystickDeadzone: number; // default: 0.08
}

export const DEFAULT_TOUCH_SETTINGS: TouchControlSettings = {
  touchLookSensitivity: 0.0035,
  invertY: false,
  joystickDeadzone: 0.08,
};
