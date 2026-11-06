export const LABEL_PRICE = 14;

export const LABELS = [
  ["LB-001", "Wall-Crawler (Red and Black)"],
  ["LB-002", "Wall-Crawler (Black and White)"],
  ["LB-003", "Black Symbiote"],
  ["LB-004", "Red Symbiote"],
  ["LB-005", "Red & Black Merc"],
  ["LB-006", "Weapon X"],
  ["LB-007", "Green Goliath"],
  ["LB-008", "Shadow Defender (Black and Yellow)"],
  ["LB-009", "Shadow Defender (Black and White)"],
  ["LB-010", "Scarlet Speedster"],
  ["LB-011", "Robots in Disguise"],
  ["LB-012", "Heroes in a Half Shell"],
  ["LB-013", "Heroes in a Half Shell (Black and White)"],
  ["LB-014", "First Shield"],
  ["LB-015", "The Super Guardian"],
  ["LB-016", "Unbroken Hero"],
].map(([code, name]) => ({ code, name, img: `/img/labels/${code.toLowerCase()}.webp` }));
