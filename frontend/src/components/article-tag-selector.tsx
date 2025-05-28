"use client";

import React, { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "./ui/multi-select";

const options = [
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
  { label: "Svelte", value: "Svelte" },
  { label: "Food", value: "Food" },
  { label: "Gaming", value: "Gaming" },
  { label: "Big Data", value: "Big Data" },
  { label: "Data Processing", value: "Data Processing" },
];

export default function ArticleTagSelector() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      {" "}
      <MultiSelector values={value} onValuesChange={setValue} loop={false}>
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Add a topic..." />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {options.map((option, i) => (
              <MultiSelectorItem key={i} value={option.value}>
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    </div>
  );
}
