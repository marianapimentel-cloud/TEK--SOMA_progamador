<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Kit de Robótica Acessível - Programação em Blocos</title>
  <!-- Carrega a biblioteca do Google Blockly -->
  <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  <script src="https://unpkg.com/blockly/python_compressed.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    #top-bar { margin-bottom: 15px; display: flex; gap: 10px; }
    button { padding: 10px 15px; font-size: 14px; cursor: pointer; }
    #container { display: flex; height: 500px; gap: 15px; }
    #blocklyDiv { height: 100%; width: 70%; border: 1px solid #ccc; }
    #codeContainer { height: 100%; width: 30%; border: 1px solid #ccc; padding: 10px; box-sizing: border-box; background: #f5f5f5; }
    pre { height: 85%; overflow: auto; background: #fff; padding: 10px; border: 1px solid #ddd; }
  </style>
</head>
<body>

  <h1>🤖 Robótica Acessível - ESP32</h1>

  <div id="top-bar">
    <button id="btnConnect">1. Conectar ESP32</button>
    <button id="btnRun">2. Enviar para o ESP32</button>
  </div>

  <div id="container">
    <!-- Área onde os blocos serão desenhados -->
    <div id="blocklyDiv"></div>

    <!-- Área de visualização do código Python gerado -->
    <div id="codeContainer">
      <h3>Código MicroPython:</h3>
      <pre><code id="pythonCode"># Os blocos vão virar código aqui...</code></pre>
    </div>
  </div>

  <!-- Definição das categorias de blocos disponíveis -->
  <xml id="toolbox" style="display: none">
    <category name="Controle" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="Lógica" colour="%{BKY_LOGIC_HUE}">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
    </category>
    <category name="Matemática" colour="%{BKY_MATH_HUE}">
      <block type="math_number"></block>
    </category>
    <category name="Robótica" colour="210">
      <block type="esp32_led"></block>
      <block type="esp32_delay"></block>
    </category>
  </xml>

  <script src="app.js"></script>
</body>
</html>