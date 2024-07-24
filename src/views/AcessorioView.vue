<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorio";
const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessoriosApi.atualizarAcessorio(acessorio);
  } else {
    await acessoriosApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessoriosApi.excluirAcessorio(id);
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
  limpar();
}
</script>

<template>
  <h1>Acessório</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="acessorio.descricao" placeholder="Descrição" class="input-field" />
    <button @click="salvar" class="btn">Salvar</button>
    <button @click="limpar" class="btn">Limpar</button>
  </div>
  <hr />
  <ul class="acessorio-list">
    <li v-for="acessorio in acessorios" :key="acessorio.id" class="acessorio-item">
      <span @click="editar(acessorio)" class="acessorio-text">
        ({{ acessorio.id }}) - {{ acessorio.descricao }} -
      </span>
      <button @click="excluir(acessorio.id)" class="btn-delete">x</button>
    </li>
  </ul>
</template>

<style>
:root {
  --primary-color: #4CAF50;
  --primary-hover-color: #45a049;
  --delete-color: #f44336;
  --delete-hover-color: #d32f2f;
  --background-color: #f9f9f9;
  --hover-background-color: #f1f1f1;
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

.acessorio-list {
  list-style-type: none;
  padding: 0;
}

.acessorio-item {
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

.acessorio-item:hover {
  background-color: var(--hover-background-color);
  transform: translateY(-3px);
}

.acessorio-text {
  flex-grow: 1;
  cursor: pointer;
  color: var(--text-color);
  font-size: var(--font-size);
  transition: color 0.3s ease;
}

.acessorio-text:hover {
  color: var(--primary-color);
}

.btn-delete {
  margin-left: 10px;
}
</style>