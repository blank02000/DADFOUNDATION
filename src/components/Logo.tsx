/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = '', size = 40 }: LogoProps) {
  return (
    <img
      src="https://prophish-uploads.s3.ap-south-1.amazonaws.com/Wallpapers/u9pya2wq/new%20logo.jpeg"
      alt="DAD Foundation Logo"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain rounded-full ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
