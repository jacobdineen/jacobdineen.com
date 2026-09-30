// Map a venue string to a chip tier class used across publication views.
const venueTier = venue => {
  const v = (venue || "").toLowerCase()
  if (/preprint|pending|under review|arxiv/.test(v)) return "tier-pre"
  if (/workshop|@|viscon/.test(v)) return "tier-ws"
  if (/findings/.test(v)) return "tier-conf"
  if (
    /\b(emnlp|acl|naacl|colm|neurips|icml|iclr|cvpr|iccv|eccv|aaai|kdd)\b/.test(
      v
    ) &&
    !/aacl/.test(v)
  )
    return "tier-top"
  return "tier-conf"
}

export default venueTier
