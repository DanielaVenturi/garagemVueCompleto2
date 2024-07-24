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
  <h1>Cor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="cor.nome" placeholder="Nome" class="input-field" />
    <button @click="salvar" class="btn">Salvar</button>
    <button @click="limpar" class="btn">Limpar</button>
  </div>
  <hr />
  <ul class="cor-list">
    <li v-for="cor in cors" :key="cor.id" class="cor-item">
      <span @click="editar(cor)" class="cor-text">
        ({{ cor.id }}) - {{ cor.nome }} -
      </span>
      <button @click="excluir(cor.id)" class="btn-delete">x</button>
    </li>
  </ul>
</template>

<style>
:root {
  --primary-color: #c70707;
  --primary-hover-color: #889088;
  --delete-color: #f44336;
  --delete-hover-color: #d32f2f;
  --background-color: #b81f1f;
  --hover-background-color: #312222;
  --border-color: #ddd;
  --text-color: #333;
  --font-size: 16px;
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

.btn {
  padding: 10px 20px;
  margin: 10px 5px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size);
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--primary-hover-color);
}

.btn-delete {
  background-color: var(--delete-color);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-delete:hover {
  background-color: var(--delete-hover-color);
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
  color: var(--text-color);
  font-size: var(--font-size);
  transition: color 0.3s ease;
}

.cor-text:hover {
  color: var(--primary-color);
}

.btn-delete {
  margin-left: 10px;
}
</style>