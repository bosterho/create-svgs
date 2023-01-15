let width = 512
let height = 72

function setup(){} // so that p5 works


function createEngineParSVG() {
	let NUM_MODULATORS = 16
	let NUM_TICKS = 3840
	let engine_par_data = []
	
	// for sKSP arrays
	function set_engine_par_data(modulator, tick, value) {
		engine_par_data[NUM_TICKS*modulator + tick] = value
	}
	
	function get_engine_par_data(modulator, tick) {
		return engine_par_data[NUM_TICKS*modulator + tick]
	}
	const [file] = document.querySelector("input[name='engine']").files;
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		engine_par_data = reader.result.split("\n")
		engine_par_data.splice(0, 1) // remove the nka's array name

		let svg = []
		svg[0] = '<svg viewBox="0 0 ' + width + ' ' + height * NUM_MODULATORS + '" xmlns="http://www.w3.org/2000/svg">\n'
		for (let mod_i = 0; mod_i < NUM_MODULATORS-1; mod_i++) {
			svg[0] += '<polyline points = "'
		
			for (let tick_i = 0; tick_i < NUM_TICKS-1; tick_i++) {
				svg[0] += map(tick_i, 0, NUM_TICKS-1, 0, width) 
				svg[0] += ','
				svg[0] += height - map(get_engine_par_data(mod_i, tick_i), 0, 1000000, 0, height) + mod_i * height
				svg[0] += ' '
			}
			svg[0] += ' ' + width + ',' + (mod_i+1) * height
			svg[0] += ' ' + '0,' + (mod_i+1) * height
			svg[0] += '" '
			svg[0] += 'fill = "black" '
			svg[0] += 'stroke = "none" '
			svg[0] += '/>\n'
		}
		svg[0] += '</svg>'
		saveStrings(svg, file.name.slice(0, -4), "svg")

	}, false);
	
	if (file) {
		reader.readAsText(file);
	}

	// clear the input so you can drop multiple times
	let input = document.querySelector("input[name='engine']")
	input.value = ""
}


function createMappingCCsSVG() {
	let NUM_MAPPING_CCS = 8
	let mapping_cc_data = []

	// for sKSP arrays
	function set_mapping_cc_data(modulator, cc, value) {
		mapping_cc_data[128*modulator + cc] = value
	}
	
	function get_mapping_cc_data(modulator, cc) {
		return mapping_cc_data[128*modulator + cc]
	}
	const [file] = document.querySelector("input[name='cc']").files;
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		mapping_cc_data = reader.result.split("\n")
		mapping_cc_data.splice(0, 1) // remove the nka's array name

		let svg = []
		svg[0] = '<svg viewBox="0 0 ' + width + ' ' + height * NUM_MAPPING_CCS + '" xmlns="http://www.w3.org/2000/svg">\n'
		for (let mod_i = 0; mod_i < NUM_MAPPING_CCS-1; mod_i++) {
			svg[0] += '<polyline points = "'
		
			for (let cc_i = 0; cc_i < 128-1; cc_i++) {
				svg[0] += map(cc_i, 0, 128-1, 0, width) 
				svg[0] += ','
				svg[0] += height - map(get_mapping_cc_data(mod_i, cc_i), 0, 127, 0, height) + mod_i * height
				svg[0] += ' '
			}
			svg[0] += ' ' + width + ',' + (mod_i+1) * height
			svg[0] += ' ' + '0,' + (mod_i+1) * height
			svg[0] += '" '
			svg[0] += 'fill = "black" '
			svg[0] += 'stroke = "none" '
			svg[0] += '/>\n'
		}
		svg[0] += '</svg>'
		saveStrings(svg, file.name.slice(0, -4), "svg")

	}, false);
	
	if (file) {
		reader.readAsText(file);
	}

	// clear the input so you can drop multiple times
	let input = document.querySelector("input[name='cc']")
	input.value = ""
}


function createModTableSVG() {
	let NUM_MAPPING_CCS = 8
	let mapping_cc_data = []

	// for sKSP arrays
	function set_mapping_cc_data(modulator, cc, value) {
		mapping_cc_data[128*modulator + cc] = value
	}
	
	function get_mapping_cc_data(modulator, cc) {
		return mapping_cc_data[128*modulator + cc]
	}
	const [file] = document.querySelector("input[name='modTable']").files;
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		mapping_cc_data = reader.result.split("\n")
		for (let i = 0; i < 128-1; i++) {
			mapping_cc_data[i] = mapping_cc_data[i].split(" ")[2]
			print(mapping_cc_data[i])
		}

		let svg = []
		svg[0] = '<svg viewBox="0 0 ' + width + ' ' + height * NUM_MAPPING_CCS + '" xmlns="http://www.w3.org/2000/svg">\n'
		svg[0] += '<polyline points = "'
	
		for (let i = 0; i < 128-1; i++) {
			svg[0] += map(i, 0, 128-1, 0, width) 
			svg[0] += ','
			svg[0] += height - map(mapping_cc_data[i], 0, 1, 0, height)
			svg[0] += ' '
		}
		svg[0] += ' ' + width + ',' + height
		svg[0] += ' ' + '0,' + height
		svg[0] += '" '
		svg[0] += 'fill = "black" '
		svg[0] += 'stroke = "none" '
		svg[0] += '/>\n'
		svg[0] += '</svg>'
		saveStrings(svg, file.name.slice(0, -4), "svg")
		
	}, false);
	
	if (file) {
		reader.readAsText(file);
	}

	// clear the input so you can drop multiple times
	let input = document.querySelector("input[name='modTable']")
	input.value = ""
}