
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
        if (item.id) {
          const formattedId = item.id.toString().padStart(5, '0')
          // Guardamos todos los riesgos (riesgo0 a riesgo7)
          dataMap[formattedId] = {
            riesgo0: typeof item.riesgo0 === 'number' ? item.riesgo0 : null,
            riesgo1: typeof item.riesgo1 === 'number' ? item.riesgo1 : null,
            riesgo2: typeof item.riesgo2 === 'number' ? item.riesgo2 : null,
            riesgo3: typeof item.riesgo3 === 'number' ? item.riesgo3 : null,
            riesgo4: typeof item.riesgo4 === 'number' ? item.riesgo4 : null,
            riesgo5: typeof item.riesgo5 === 'number' ? item.riesgo5 : null,
            riesgo6: typeof item.riesgo6 === 'number' ? item.riesgo6 : null,
            riesgo7: typeof item.riesgo7 === 'number' ? item.riesgo7 : null
          }
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


export async function getDepartmentValue(departmentId, day = 0) {
  const data = await getDepartmentDataFromDB()
  const departmentData = data[departmentId]
  if (!departmentData) return null
  return departmentData[`riesgo${day}`] || null
}


export function clearDepartmentDataCache() {
  departmentDataCache = null
  lastFetchTime = null
}
