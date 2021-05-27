export const DEFAULT_THEME = "white"
export const THEME_LIST = [DEFAULT_THEME, "blue"]

export function isDefined(a) {
  return typeof a !== "undefined"
}

const DEFAULT_RADIX = 10
export function atoi(i) {
  return parseInt(i, DEFAULT_RADIX)
}

export function getTheme(theme) {
  let result = theme
  if (!isDefined(theme) || !THEME_LIST.includes(theme))
    result = DEFAULT_THEME

  return result
}

export function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order)
}

export function sortListByReverseOrder(list) {
  return list.sort((a, b) => b.reverseOrder - a.reverseOrder)
}

function getNextSectionsId(currentSectionsId) {
  return document.getElementById(currentSectionsId).nextSibling.id
}

export function scrollToNextSection(currentSectionsId) {
  const nextSectionsId = getNextSectionsId(currentSectionsId)
  document.getElementById(nextSectionsId).scrollIntoView(true)
}

export function fixFilePath(file) {
  return file.replace(/\\/g, "/")
}

export function buildSectionList(pageSections, buildSections) {
  let sectionList = []
  if (isDefined(pageSections)) {
    const builtSections = buildSections(pageSections)
    const filteredSections = builtSections.filter((section) => isDefined(section))
    sectionList = sortListByOrder(filteredSections)
  }

  return sectionList
}
