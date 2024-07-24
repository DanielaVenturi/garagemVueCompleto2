<template>
  <h1>Marca</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="marca.nome" placeholder="nome" class="input-field" />
    <input type="text" v-model="marca.nacionalidade" placeholder="nacionalidade" class="input-field" />
    <button @click="salvar" class="btn">Salvar</button>
    <button @click="limpar" class="btn">Limpar</button>
  </div>
  <hr />
  <ul class="marca-list">
    <li v-for="marca in marcas" :key="marca.id" class="marca-item">
      <span @click="editar(marca)" class="marca-text">
        ({{ marca.id }}) - {{ marca.nome.toUpperCase() }} - {{ marca.nacionalidade }}
      </span>
      <button @click="excluir(marca.id)" class="btn-delete">x</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import MarcaApi from "@/api/marca";
const marcaApi = new MarcaApi();

const defaultMarca = { id: null, nome: "", nacionalidade: ""};
const marcas = ref([]);
const marca = reactive({ ...defaultMarca });

onMounted(async () => {
  marcas.value = await marcaApi.buscarTodasAsMarcas();
});

function limpar() {
  Object.assign(marca, { ...defaultMarca });
}

async function salvar() {
  if (marca.id) {
    await marcaApi.atualizarMarca(marca);
  } else {
    await marcaApi.adicionarMarca(marca);
  }
  marcas.value = await marcaApi.buscarTodasAsMarcas();
  limpar();
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar);
}

async function excluir(id) {
  await marcaApi.excluirMarca(id);
  marcas.value = await marcaApi.buscarTodasAsMarcas();
  limpar();
}

const nomeMaiusculo = computed(() => marca.nome.toUpperCase());
</script>

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

.marca-list {
  list-style-type: none;
  padding: 0;
}

.marca-item {
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

.marca-item:hover {
  background-color: var(--hover-background-color);
  transform: translateY(-3px);
}

.marca-text {
  flex-grow: 1;
  cursor: pointer;
  color: var(--text-color);
  font-size: var(--font-size);
  transition: color 0.3s ease;
}

.marca-text:hover {
  color: var(--primary-color);
}

.btn-delete {
  margin-left: 10px;
}
</style>
