
import api from '../api.js'


let departmentDataCache = null
let lastFetchTime = null
const CACHE_DURATION = 5 * 60 * 1000 

export async function fetchDepartmentData() {
  try {
    const response = await api.getInundaciones()
    const inundacionesData = response.data || []
    const dataMap = {}
    if (Array.isArray(inundacionesData)) {
      inundacionesData.forEach(item => {
        if (item.id && typeof item.riesgo === 'number') {
          const formattedId = item.id.toString().padStart(5, '0')
          dataMap[formattedId] = item.riesgo
        }
      })
    }
    
    console.log('Loaded department flood data:', dataMap)
    return dataMap
  } catch (error) {
    console.error('Error fetching department data:', error)
    return {}
  }
}


export async function getDepartmentDataFromDB() {
  const now = Date.now()
  
  if (departmentDataCache && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    return departmentDataCache
  }
  
  departmentDataCache = await fetchDepartmentData()
  lastFetchTime = now
  
  return departmentDataCache
}


export async function getDepartmentValue(departmentId) {
  const data = await getDepartmentDataFromDB()
  return data[departmentId] || null
}


export function clearDepartmentDataCache() {
  departmentDataCache = null
  lastFetchTime = null
}
