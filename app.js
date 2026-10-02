// 1. Inicializa o Workspace do Blockly
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
});

// 2. Define um bloco personalizado: Ligar/Desligar LED
Blockly.Blocks['esp32_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Mudar LED no pino")
        .appendField(new Blockly.FieldNumber(2), "PIN")
        .appendField("para")
        .appendField(new Blockly.FieldDropdown([["LIGADO","1"], ["DESLIGADO","0"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  }
};

// Gerador de código Python para o bloco de LED
Blockly.Python['esp32_led'] = function(block) {
  const pin = block.getFieldValue('PIN');
  const state = block.getFieldValue('STATE');
  return `Pin(${pin}, Pin.OUT).value(${state})\n`;
};

// 3. Define um bloco personalizado: Esperar (Segundos)
Blockly.Blocks['esp32_delay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Esperar")
        .appendField(new Blockly.FieldNumber(1), "SECONDS")
        .appendField("segundo(s)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
  }
};

// Gerador de código Python para o bloco de Espera
Blockly.Python['esp32_delay'] = function(block) {
  const seconds = block.getFieldValue('SECONDS');
  return `time.sleep(${seconds})\n`;
};

// 4. Atualiza o código Python na tela em tempo real
function updateCode() {
  const code = Blockly.Python.workspaceToCode(workspace);
  document.getElementById('pythonCode').textContent = code || "# Arraste blocos para ver o código aqui";
}
workspace.addChangeListener(updateCode);

// 5. Comunicação Web Serial com o ESP32
let port;
let writer;

document.getElementById('btnConnect').addEventListener('click', async () => {
  try {
    // Pede autorização ao usuário para conectar à porta USB
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    alert("ESP32 Conectado com sucesso!");
  } catch (err) {
    alert("Erro ao conectar: " + err);
  }
});

document.getElementById('btnRun').addEventListener('click', async () => {
  if (!port) {
    alert("Por favor, conecte o ESP32 primeiro clicando no botão 1!");
    return;
  }

  const rawCode = Blockly.Python.workspaceToCode(workspace);
  
  // Adiciona as bibliotecas padrões do MicroPython ao início do código
  const fullScript = `from machine import Pin\nimport time\n\n${rawCode}`;

  try {
    const textEncoder = new TextEncoder();
    writer = port.writable.getWriter();
    
    // Envia o comando para executar o script direto no REPL do MicroPython
    await writer.write(textEncoder.encode(fullScript + "\r\n"));
    writer.releaseLock();
    
    alert("Código enviado para o ESP32!");
  } catch (err) {
    alert("Erro ao enviar código: " + err);
  }
});