import { c as createLucideIcon } from "./sparkles-CUW_-72z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function getMatchColor(score) {
  if (score >= 85) return "text-accent";
  if (score >= 70) return "text-chart-3";
  if (score >= 50) return "text-chart-4";
  return "text-destructive";
}
function getMatchBg(score) {
  if (score >= 85) return "bg-accent/10 border-accent/30";
  if (score >= 70) return "bg-chart-3/10 border-chart-3/30";
  if (score >= 50) return "bg-chart-4/10 border-chart-4/30";
  return "bg-destructive/10 border-destructive/30";
}
export {
  MapPin as M,
  getMatchColor as a,
  getMatchBg as g
};
