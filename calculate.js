function createTableFromJSON(jsonData) {
    // create a table element
    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "40%";
  
    // add a header row to the table
    var headerRow = document.createElement("tr");
    for (var key in jsonData[0]) {
        var headerCell = document.createElement("th");
        headerCell.style.border = "1px solid black";
        headerCell.style.padding = "10px";
        var headerText = document.createTextNode(key);
        headerCell.appendChild(headerText);
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);
  
    // add rows and cells to the table for each object in the JSON data
    for (var i = 0; i < jsonData.length; i++) {
      var dataRow = document.createElement("tr");
      dataRow.style.backgroundColor = i % 2 === 0 ? "#f2f2f2" : "#fff";
      for (var key in jsonData[i]) {
        var dataCell = document.createElement("td");
        dataCell.style.border = "1px solid black";
        dataCell.style.padding = "10px";
        var dataText = document.createTextNode(jsonData[i][key]);
        dataCell.appendChild(dataText);
        dataRow.appendChild(dataCell);
      }
      table.appendChild(dataRow);
    }
  
    // add the table to the page
    document.body.appendChild(table);
    
    var lineBreak = document.createElement("br");
    var tableDiv = document.createElement("div");
    tableDiv.appendChild(table);
    tableDiv.appendChild(lineBreak);
    document.body.appendChild(tableDiv);
  }

function calculate_pol_base() {
    
    // Pega os valores dos inputs
    var vcc = parseFloat(document.getElementById('vcc').value);
    var vbb = parseFloat(document.getElementById('vbb').value);
    var vbe = parseFloat(document.getElementById('vbe').value);

    var rc = parseFloat(document.getElementById('rc').value);
    var rb = parseFloat(document.getElementById('rb').value);

    var hfe = parseFloat(document.getElementById('hfe').value);
    var pd;

    // Calcular a corrente máxima no coletor
    ic_sat = vcc / rc

    // Calcular corrente na base
    ib = (vbb - vbe) / rb;

    // Verificação de corrente saturada
    ic = hfe * ib

    if(ic >= ic_sat){
        ic = ic_sat
        hfe = ic / ib;
    }

    // Calcular corrente e tensão do emissor
    ie = ic + ib;
    vce = vcc - rc*ic

    // Potência dissipada no transistor
    pd = vce*ic;

    // Calcula valor de alfa
    alfa = ic/ie;
    
    // Imprime o passo-passo
    var steps = [
        {"Step": "1) Calcular ic saturado", "Formula": "ic_sat = vcc / rc"},
        {"Step": "2) Calcular ib", "Formula": "ib = (vbb - vbe) / rb"},
        {"Step": "3) Calcular ic", "Formula": "ic = hfe * ib"},
        {"Step": "4) Verificar presença de absurdo", "Formula": "ic >= ic_sat"},
        {"Step": "5) Em caso de absurdo descobrir ic", "Formula": "ic = ic_sat"},
        {"Step": "6) Em caso de absurdo descobrir hfe", "Formula": "hfe = ic / ib"},
        {"Step": "7) Calcular ie", "Formula": "ie = ic + ib"},
        {"Step": "8) Calcular vce", "Formula": "vce = vcc - rc*ic"},
        {"Step": "9) Calcular potência no transistor", "Formula": "pd = vce*ic"},
        {"Step": "10) Calcular alfa", "Formula": "alfa = ic/ie"}
    ]

    // Imprime os valores dos resultados
    var output = [
        {"Name": "vcc", "Type": "Entrada", "Value": "vcc"},
        {"Name": "vbb", "Type": "Entrada", "Value": vbb},
        {"Name": "vbe", "Type": "Entrada", "Value": vbe},
        {"Name": "vce", "Type": "Saída", "Value": vce},
        {"Name": "ic", "Type": "Saída", "Value": ic},
        {"Name": "ib", "Type": "Saída", "Value": ib},
        {"Name": "ie", "Type": "Saída", "Value": ie},
        {"Name": "hfe", "Type": "Entrada", "Value": hfe},
        {"Name": "rc", "Type": "Entrada", "Value": rc},
        {"Name": "rb", "Type": "Entrada", "Value": rb},
        {"Name": "pd", "Type": "Saída", "Value": pd},
        {"Name": "alfa", "Type": "Saída", "Value": alfa}
    ]

    createTableFromJSON(steps)
    createTableFromJSON(output)
}

function calculate_pol_emissor() {
    // Pega os valores dos inputs
    var vcc = parseFloat(document.getElementById('vcc').value);
    var vbb = parseFloat(document.getElementById('vbb').value);
    var vbe = parseFloat(document.getElementById('vbe').value);

    var rc = parseFloat(document.getElementById('rc').value);
    var re = parseFloat(document.getElementById('re').value);

    var pd;

    // Calcular tensão ve
    ve = vbb - vbe

    // Calcular tensão ie
    ie = ve/re

    // ic = ie pois ib é infimo
    ic = ie

    // Achar tensão em VCE
    vce = vcc -ic*rc - ve

    // Potência dissipada no transistor
    pd = vce*ic;

    // Imprime o passo-passo
    var steps = [
        {"Step": "1) Calcular ve", "Formula": "ve = vbb - vbe"},
        {"Step": "2) Calcular ie", "Formula": "ie = ve/re"},
        {"Step": "3) Calcular ic", "Formula": "ic = ie"},
        {"Step": "4) Calcular vce", "Formula": "vce = vcc -ic*rc - ve"},
        {"Step": "5) Calcular potência no transistor", "Formula": "pd = vce*ic"}
    ]

    // Imprime os valores dos resultados
    var output = [
        {"Name": "vcc", "Type": "Entrada", "Value": vcc},
        {"Name": "vbb", "Type": "Entrada", "Value": vbb},
        {"Name": "vbe", "Type": "Entrada", "Value": vbe},
        {"Name": "vce", "Type": "Saída", "Value": vce},
        {"Name": "ic", "Type": "Saída", "Value": ic},
        {"Name": "ie", "Type": "Saída", "Value": ie},
        {"Name": "rc", "Type": "Entrada", "Value": rc},
        {"Name": "re", "Type": "Entrada", "Value": re},
        {"Name": "pd", "Type": "Saída", "Value": pd},
        {"Name": "alfa", "Type": "Saída", "Value": 1}
    ]

    createTableFromJSON(steps)
    createTableFromJSON(output)

}

function calculate_pol_emissor_div_tens() {
    // Pega os valores dos inputs
    var vcc = parseFloat(document.getElementById('vcc').value);
    var vbe = parseFloat(document.getElementById('vbe').value);

    var r1 = parseFloat(document.getElementById('r1').value);
    var r2 = parseFloat(document.getElementById('r2').value);
    var rc = parseFloat(document.getElementById('rc').value);
    var re = parseFloat(document.getElementById('re').value);

    var pd;
    var valido;

    // Calculate I
    i = vcc / (r1 + r2)

    // Calculate vb
    vb = i * r2

    // Calcular tensão ve
    ve = vb - vbe

    // Calcular tensão ie
    ie = ve/re

    // ic = ie pois ib é infimo
    ic = ie

    // Achar tensão em VCE
    vce = vcc -ic*rc - ve

    // Potência dissipada no transistor
    pd = vce*ic;

    // Verifica se resultado é válido
    ib_max = i / 20

    ib_1 = ic / 30
    ib_2 = ic / 300

    if (ib_max > ib_1 || ib_max > ib_2){
        valido = true;
        ib = 0;
    } 
    else{
        valido = false;
        ib = null;
    }

    // Imprime o passo-passo
    var steps = [
        {"Step": "1) Calcular I", "Formula": "I = vcc / (r1 + r2)"},
        {"Step": "2) Calcular vb", "Formula": "vb = i * r2"},
        {"Step": "3) Calcular ve", "Formula": "ve = vb - vbe"},
        {"Step": "4) Calcular ie", "Formula": "ie = ve/re"},
        {"Step": "5) Calcular ic (considerando ib ínfimo)", "Formula": "ic = ie"},
        {"Step": "6) Calcular vce", "Formula": "vce = vcc -ic*rc - ve"},
        {"Step": "7) Calcular potência no transistor", "Formula": "pd = vce*ic"},
        {"Step": "8) Acha ib_max", "Formula": "ib_max = i / 20"},
        {"Step": "9) Verifica se resultado é válido", "Formula": "ib_max > ic/30 or ib_max > ic/300"},
        {"Step": "10) Acha ib caso seja válido", "Formula": "ib = 0"}
    ]

    // Imprime os valores dos resultados
    var output = [
        {"Name": "vcc", "Type": "Entrada", "Value": vcc},
        {"Name": "vbe", "Type": "Entrada", "Value": vbe},
        {"Name": "vce", "Type": "Saída", "Value": vce},
        {"Name": "ic", "Type": "Saída", "Value": ic},
        {"Name": "ib", "Type": "Saída", "Value": ib},
        {"Name": "ie", "Type": "Saída", "Value": ie},
        {"Name": "r1", "Type": "Entrada", "Value": r1},
        {"Name": "r2", "Type": "Entrada", "Value": r2},
        {"Name": "rc", "Type": "Entrada", "Value": rc},
        {"Name": "re", "Type": "Entrada", "Value": re},
        {"Name": "pd", "Type": "Saída", "Value": pd},
        {"Name": "alfa", "Type": "Saída", "Value": 1},
        {"Name": "valido", "Type": "Saída", "Value": valido}
    ]

    createTableFromJSON(steps)
    createTableFromJSON(output)

}