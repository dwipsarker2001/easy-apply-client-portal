// src/features/font/FontSelector.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setHeadingSize, setParagraphSize } from './themeSlice';

const Theme: React.FC = () => {
  const dispatch = useAppDispatch();
  const { headingSize, paragraphSize } = useAppSelector(state => state.theme);

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold">Heading Size</label>
        <select
          value={headingSize}
          onChange={(e) => dispatch(setHeadingSize(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="text-xl">text-xl</option>
          <option value="text-2xl">text-2xl</option>
          <option value="text-3xl">text-3xl</option>
          <option value="text-4xl">text-4xl</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Paragraph Size</label>
        <select
          value={paragraphSize}
          onChange={(e) => dispatch(setParagraphSize(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="text-sm">text-sm</option>
          <option value="text-base">text-base</option>
          <option value="text-lg">text-lg</option>
          <option value="text-xl">text-xl</option>
        </select>
      </div>
    </div>
  );
};

export default Theme;
