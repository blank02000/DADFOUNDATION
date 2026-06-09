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
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central Green Heart */}
      <path 
        d="M250 220 
           C250 220, 222 180, 192 180 
           C162 180, 140 205, 140 240 
           C140 282, 195 325, 250 365 
           C305 325, 360 282, 360 240 
           C360 205, 338 180, 308 180 
           C278 180, 250 220, 250 220 Z" 
        fill="#1B7330" 
      />

      {/* Top Left Adult (Blue) */}
      {/* Head */}
      <circle cx="180" cy="110" r="22" fill="#0A2240" />
      {/* Body Curve */}
      <path 
        d="M198 126
           C160 135, 120 180, 120 235
           C120 270, 131 292, 146 308
           C134 268, 146 195, 204 150
           L198 126 Z" 
        fill="#0A2240" 
      />

      {/* Top Right Adult (Green) */}
      {/* Head */}
      <circle cx="340" cy="115" r="22" fill="#1B7330" />
      {/* Body Curve */}
      <path 
        d="M322 124
           C350 115, 410 162, 410 245
           C410 295, 380 345, 320 375
           C375 325, 390 250, 340 160
           L322 124 Z" 
        fill="#1B7330" 
      />

      {/* Wheelchair User (Blue) */}
      {/* Head */}
      <circle cx="190" cy="225" r="17" fill="#0A2240" />
      {/* Body/Torso and Seat */}
      <path 
        d="M178 245
           C165 260, 160 295, 185 305
           L215 315
           C225 318, 230 330, 230 345
           C230 355, 220 362, 210 362
           C195 362, 192 345, 192 345
           C192 345, 180 348, 180 355
           C180 375, 210 375, 222 375
           C245 375, 252 355, 252 340
           C252 315, 230 300, 215 295
           L190 286
           C180 282, 184 252, 194 252
           L178 245 Z" 
        fill="#0A2240" 
      />
      {/* Wheelchair Wheel */}
      <path 
        d="M195 307
           C216 307, 233 324, 233 345
           C233 366, 216 383, 195 383
           C174 383, 157 366, 157 345
           C157 324, 174 307, 195 307 Z
           M195 318
           C180 318, 168 330, 168 345
           C168 360, 180 372, 195 372
           C210 372, 222 360, 222 345
           C222 330, 210 318, 195 318 Z" 
        fill="#0A2240" 
      />
      {/* Inner Wheel Hub */}
      <circle cx="195" cy="345" r="7" fill="#0A2240" />

      {/* Child (Blue) */}
      {/* Head */}
      <circle cx="310" cy="270" r="15" fill="#0A2240" />
      {/* Body Curve */}
      <path 
        d="M302 284
           C285 295, 270 325, 290 345
           C305 360, 330 345, 345 315
           C332 310, 320 295, 314 288
           L302 284 Z" 
        fill="#0A2240" 
      />
    </svg>
  );
}
