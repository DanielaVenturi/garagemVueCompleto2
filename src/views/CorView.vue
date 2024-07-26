<script setup>
import { ref, reactive, onMounted } from "vue";
import CorApi from "@/api/cor";
const corApi = new CorApi();

const defaultCor = { id: null, nome: "" };
const cors = ref([]);
const cor = reactive({ ...defaultCor });

onMounted(async () => {
  cors.value = await corApi.buscarTodasAsCores();
});

function limpar() {
  Object.assign(cor, { ...defaultCor });
}

async function salvar() {
  if (cor.id) {
    await corApi.atualizarCor(cor);
  } else {
    await corApi.adicionarCor(cor);
  }
  cors.value = await corApi.buscarTodasAsCores();
  limpar();
}

function editar(cor_para_editar) {
  Object.assign(cor, cor_para_editar);
}

async function excluir(id) {
  await corApi.excluirCategoria(id);
  cors.value = await corApi.buscarTodasAsCores();
  limpar();
}
</script>

<template>
  <h1 class="titulo-cor">Cor</h1>

  <div class="cor">
    <div class="form-section">
      <input
        type="text"
        v-model="cor.nome"
        placeholder="Nome"
        class="input-field"
      />
      <button @click="salvar" class="btn salvar">Salvar</button>
      <button @click="limpar" class="btn limpar">Limpar</button>
    </div>

    <div class="list-section">
      <ul class="cor-list">
        <li v-for="cor in cors" :key="cor.id" class="cor-item">
          <span @click="editar(cor)" class="cor-text">
            ({{ cor.id }}) - {{ cor.nome }} -
          </span>
          <button @click="excluir(cor.id)" class="btn-delete">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.cor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-section,
.list-section {
  padding: 20px;
  background-color: #ccc;
  border-radius: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: var(--font-size);
}
.titulo-cor{
  font-size: 24px;
  text-align: center;
}
.btn {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.salvar {
  background-color: #000000;
  color: white;
}

.btn.salvar:hover {
  background-color: #817373;
}

.btn.limpar {
  background-color: #000000;
  color: white;
}

.btn.limpar:hover {
  background-color: #817373;
}

.btn-delete {
  background-color: #0c0a0a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-delete:hover {
  background-color: #4b3433;
  transform: scale(1.1);
}

.cor-list {
  list-style-type: none;
  padding: 0;
}

.cor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cor-item:hover {
  background-color: var(--hover-background-color);
  transform: translateY(-3px);
}

.cor-text {
  flex-grow: 1;
  cursor: pointer;
  color: #000000;
  font-size: var(--font-size);
    transition: color 0.3s ease;
    background-color: aliceblue;
    border-radius: 4px;
    padding: 10px;
}

.cor-text:hover {
  color:#817373;;
}

.btn-delete {
  margin-left: 10px;
}
@media (max-width: 978px) {
  .cor {
    grid-template-columns: 1fr ;
    width: 90%;
  }
  .btn {
    width: 100%;
    margin: 5px 0;
  }
  .input-field {
    font-size: 14px;
  }
  .titulo_cor {
    font-size: 20px;
  }
} 
@media (max-width:820px) {
  .cor{
    grid-template-columns: 1fr;
    width: 75%;
  }
}
</style>