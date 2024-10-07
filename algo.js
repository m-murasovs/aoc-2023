const list = [1, 2, 3, 4, 5, 6];
const k = 4;

const allGroupsOf4 = list.forEach((item, index) => {
  const group = list.slice(index, index + 3);
  if (group.length === 4) return group;
});
console.log(allGroupsOf4);
