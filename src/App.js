import "./styles.css";
import data from "./data";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { useState } from "react";
import STATUS from "./consts";

export default function App() {
  const [inputData, setInputData] = useState(data);

  const computeStatus = (node) => {
    if (!node.children || node.children.length == 0) return;
    let checkedCount = 0;
    let unCheckedCount = 0;
    let indeterminateCount = 0;
    node.children.map((child) => {
      if (child.status === STATUS.CHECKED) checkedCount++;
      if (child.status === STATUS.UNCHECKED) unCheckedCount++;
      if (child.status === STATUS.INDETERMINATE) indeterminateCount++;
    });
    if (checkedCount === node.children.length) {
      node.status = STATUS.CHECKED;
    } else if (unCheckedCount === node.children.length) {
      node.status = STATUS.UNCHECKED;
    } else if (checkedCount > 0 || unCheckedCount > 0) {
      node.status = STATUS.INDETERMINATE;
    }
  };

  const traverse = (node, targetId, isDescendant, ancestorStatus) => {
    if (node.id === targetId) {
      if (node.status === STATUS.CHECKED) {
        node.status = STATUS.UNCHECKED;
      } else {
        node.status = STATUS.CHECKED;
      }
    }
    if (isDescendant) {
      node.status = ancestorStatus;
    }
    if (node.children && node.children.length > 0) {
      node.children.map((child) =>
        traverse(
          child,
          targetId,
          node.id == targetId || isDescendant,
          node.status
        )
      );
    }
    computeStatus(node);
  };

  const handleChange = (id) => {
    const cloneDeepInputData = JSON.parse(JSON.stringify(inputData));
    cloneDeepInputData.map((rootNode) => {
      traverse(rootNode, id);
    });
    setInputData(cloneDeepInputData);
  };

  return (
    <div className="App">
      <IndeterminateCheckbox
        chechBoxData={inputData}
        handleChange={handleChange}
      />
    </div>
  );
}
