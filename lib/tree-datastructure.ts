// Tree data structure used to hold the chat responses and inputs
// Each node in the tree has a priority child which is what the user is currently looking at
// However hitting the go forward or go back changes the priority child and updates what the user is seeing

class TreeNode {
  data: string;
  messageId: string;
  children: TreeNode[];
  priorityChild: number;

  constructor(data: string, messageId: string) {
    this.data = data;
    this.messageId = messageId;
    this.children = [];
    this.priorityChild = 0;
  }

  addChild(childNode: TreeNode): void {
    this.children.push(childNode);
  }

  changePriorityChild(direction: number): void {
    if (this.priorityChild + direction < 0) return;
    if (this.priorityChild + direction > this.children.length - 1) return;

    this.priorityChild = this.priorityChild + direction;
  }
}

class Tree {
  data: string;
  children: TreeNode[];
  priorityChild: number;

  constructor(rootData: string) {
    this.children = [];
    this.data = rootData;
    this.priorityChild = 0;
  }

  // Returns the priority child of the tree at a certain height (the level)
  getChildAtLevel(level: number, chatTree: Tree): TreeNode {
    if (level < 0) level = 0;

    let iteratorNode: TreeNode = chatTree.children[chatTree.priorityChild];

    for (let i = 0; i < level; i++) {
      iteratorNode = iteratorNode.children[iteratorNode.priorityChild];
    }

    return iteratorNode;
  }

  // Returns the string array representation of what path of the tree the user is currently on
  returnStringArray(): string[] {
    let iteratorNode: TreeNode = this.children[this.priorityChild];
    const totalArray: string[] = [];

    while (iteratorNode) {
      // If the node's data is not just a space, add it to the totalArray
      //console.log(iteratorNode);
      if (iteratorNode.data.trim() !== '') {
        totalArray.push(iteratorNode.data);
      }
      // Proceed to the priority child if it exists, or break the loop
      if (
        iteratorNode.children.length > 0 &&
        iteratorNode &&
        iteratorNode.children &&
        iteratorNode.children[iteratorNode.priorityChild]
      ) {
        iteratorNode = iteratorNode.children[iteratorNode.priorityChild];
      } else {
        break; // No more children, so we break the loop
      }
    }

    return totalArray;
  }

  printTree(node?: TreeNode, depth: number = 0): void {
    if (!node) {
      // For the root
      console.log(`Depth ${depth}: [${this.data}]`);
      if (this.children.length > 0) {
        const childData = this.children.map((child) => child.data);
        console.log(`Depth ${depth + 1} children: [${childData.join(', ')}]`);
        for (const child of this.children) {
          this.printTree(child, depth + 2);
        }
      }
    } else {
      if (node.children.length > 0) {
        const childData = node.children.map((child) => child.data);
        console.log(`Depth ${depth} children: [${childData.join(', ')}]`);
        for (const child of node.children) {
          this.printTree(child, depth + 1);
        }
      }
    }
  }
}

export { Tree, TreeNode };
