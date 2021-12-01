
document.getElementById('catego').addEventListener('change', (event) => {
    const code = document.getElementById('catego').value;
    document.getElementById('inst').length = 0;
    dataInstrumentos.filter(instr => instr.categoria == code).forEach(instrAux => {
        document.getElementById('inst').add(new Option( instrAux.name, instrAux.code));
    })

});
