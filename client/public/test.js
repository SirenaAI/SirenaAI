const LOCATIONS = {
  '62091': '25 De Mayo, Río Negro',
  '06854': '25 De Mayo, Buenos Aires',
  '22168': '25 De Mayo, Chaco',
  '70126': '25 De Mayo, San Juan',
  '54119': '25 De Mayo, Misiones',
  '22105': '9 De Julio, Chaco',
  '70063': '9 De Julio, San Juan',
  '06588': '9 De Julio, Buenos Aires',
  '62049': '9 De Julio, Río Negro',
  '82077': '9 De Julio, Santa Fe',
  '06007': 'Adolfo Alsina, Buenos Aires',
  '62007': 'Adolfo Alsina, Río Negro',
  '22007': 'Almirante Brown, Chaco',
  '06028': 'Almirante Brown, Buenos Aires',
  '86028': 'Avellaneda, Santiago Del Estero',
  '06035': 'Avellaneda, Buenos Aires',
  '62014': 'Avellaneda, Río Negro',
  '06042': 'Ayacucho, Buenos Aires',
  '74007': 'Ayacucho, San Luis',
  '86042': 'Belgrano, Santiago Del Estero',
  '82007': 'Belgrano, Santa Fe',
  '74014': 'Belgrano, San Luis',
  '22014': 'Bermejo, Chaco',
  '34007': 'Bermejo, Formosa',
  '18021': 'Capital, Corrientes',
  '14014': 'Capital, Córdoba',
  '46014': 'Capital, La Rioja',
  '66028': 'Capital, Salta',
  '42021': 'Capital, La Pampa',
  '86049': 'Capital, Santiago Del Estero',
  '50007': 'Capital, Mendoza',
  '90084': 'Capital, Tucumán',
  '70028': 'Capital, San Juan',
  '10049': 'Capital, Catamarca',
  '54028': 'Capital, Misiones',
  '74028': 'Chacabuco, San Luis',
  '22028': 'Chacabuco, Chaco',
  '06210': 'Chacabuco, Buenos Aires',
  '06175': 'Colon, Buenos Aires',
  '30008': 'Colon, Entre Ríos',
  '14021': 'Colon, Córdoba',
  '54035': 'Concepción, Misiones',
  '18028': 'Concepción, Corrientes',
  '74021': 'Coronel Pringles, San Luis',
  '06196': 'Coronel Pringles, Buenos Aires',
  '06277': 'Florentino Ameghino, Buenos Aires',
  '26028': 'Florentino Ameghino, Chubut',
  '18056': 'General Alvear, Corrientes',
  '06287': 'General Alvear, Buenos Aires',
  '50014': 'General Alvear, Mendoza',
  '06301': 'General Belgrano, Buenos Aires',
  '46063': 'General Belgrano, La Rioja',
  '22049': 'General Belgrano, Chaco',
  '66049': 'General Güemes, Salta',
  '22063': 'General Güemes, Chaco',
  '06343': 'General Paz, Buenos Aires',
  '18063': 'General Paz, Corrientes',
  '62042': 'General Roca, Río Negro',
  '14035': 'General Roca, Córdoba',
  '06371': 'General San Martin, Buenos Aires',
  '14042': 'General San Martin, Córdoba',
  '22070': 'Independencia, Chaco',
  '46105': 'Independencia, La Rioja',
  '06410': 'Ituzaingó, Buenos Aires',
  '18084': 'Ituzaingó, Corrientes',
  '74049': 'Junín, San Luis',
  '50035': 'Junín, Mendoza',
  '06413': 'Junín, Buenos Aires',
  '10070': 'La Paz, Catamarca',
  '50042': 'La Paz, Mendoza',
  '30070': 'La Paz, Entre Ríos',
  '18091': 'Lavalle, Corrientes',
  '50056': 'Lavalle, Mendoza',
  '22084': 'Libertador General San Martín, Chaco',
  '54077': 'Libertador General San Martín, Misiones',
  '74063': 'Libertador General San Martín, San Luis',
  '22091': 'Maipú, Chaco',
  '50070': 'Maipú, Mendoza',
  '06511': 'Maipú, Buenos Aires',
  '06532': 'Mercedes, Buenos Aires',
  '18105': 'Mercedes, Corrientes',
  '14070': 'Minas, Córdoba',
  '58077': 'Minas, Neuquén',
  '86119': 'Moreno, Santiago Del Estero',
  '06560': 'Moreno, Buenos Aires',
  '86133': 'Pellegrini, Santiago Del Estero',
  '06616': 'Pellegrini, Buenos Aires',
  '70077': 'Rawson, San Juan',
  '26077': 'Rawson, Chubut',
  '86154': 'Rivadavia, Santiago Del Estero',
  '06679': 'Rivadavia, Buenos Aires',
  '70084': 'Rivadavia, San Juan',
  '66133': 'Rivadavia, Salta',
  '50084': 'Rivadavia, Mendoza',
  '38056': 'San Antonio, Jujuy',
  '62077': 'San Antonio, Río Negro',
  '50091': 'San Carlos, Mendoza',
  '66154': 'San Carlos, Salta',
  '06749': 'San Fernando, Buenos Aires',
  '22140': 'San Fernando, Chaco',
  '14133': 'San Javier, Córdoba',
  '54105': 'San Javier, Misiones',
  '82098': 'San Javier, Santa Fe',
  '82112': 'San Justo, Santa Fe',
  '14140': 'San Justo, Córdoba',
  '82119': 'San Lorenzo, Santa Fe',
  '22147': 'San Lorenzo, Chaco',
  '70091': 'San Martin, San Juan',
  '82126': 'San Martin, Santa Fe',
  '86175': 'San Martin, Santiago Del Estero',
  '50098': 'San Martin, Mendoza',
  '18147': 'San Martin, Corrientes',
  '06760': 'San Miguel, Buenos Aires',
  '18154': 'San Miguel, Corrientes',
  '54112': 'San Pedro, Misiones',
  '38063': 'San Pedro, Jujuy',
  '06770': 'San Pedro, Buenos Aires',
  '10098': 'Santa Rosa, Catamarca',
  '50112': 'Santa Rosa, Mendoza',
  '70105': 'Sarmiento, San Juan',
  '86182': 'Sarmiento, Santiago Del Estero',
  '26091': 'Sarmiento, Chubut'
}

// Load departamentos.json and update "nam" values for all codes in LOCATIONS
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function updateDepartmentNames() {
  try {
    // Read the departamentos.json file
    const departamentosPath = join(__dirname, 'departamentos.json')
    const departamentosData = JSON.parse(readFileSync(departamentosPath, 'utf8'))

    let updatedCount = 0

    // Update the "nam" property for each matching "in1" code
    departamentosData.features.forEach(feature => {
      const code = feature.properties.in1
      if (LOCATIONS[code]) {
        console.log(`Updating ${code}: "${feature.properties.nam}" -> "${LOCATIONS[code]}"`)
        feature.properties.nam = LOCATIONS[code]
        updatedCount++
      }
    })

    // Write the updated data back to the file (minified)
    writeFileSync(departamentosPath, JSON.stringify(departamentosData), 'utf8')

    console.log(`\n✅ Successfully updated ${updatedCount} departments in departamentos.json`)
  } catch (error) {
    console.error('Error updating departamentos.json:', error)
  }
}

// Run the function
updateDepartmentNames()
