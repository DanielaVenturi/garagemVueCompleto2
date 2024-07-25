<script setup>
import { ref, reactive, onMounted } from 'vue'
import CategoriasApi from '@/api/categorias'
const categoriasApi = new CategoriasApi()

const defaultCategoria = { id: null, descricao: '' }
const categorias = ref([])
const categoria = reactive({ ...defaultCategoria })

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias()
})

function limpar() {
  Object.assign(categoria, { ...defaultCategoria })
}

async function salvar() {
  if (categoria.id) {
    await categoriasApi.atualizarCategoria(categoria)
  } else {
    await categoriasApi.adicionarCategoria(categoria)
  }
  categorias.value = await categoriasApi.buscarTodasAsCategorias()
  limpar()
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar)
}

async function excluir(id) {
  await categoriasApi.excluirCategoria(id)
  categorias.value = await categoriasApi.buscarTodasAsCategorias()
  limpar()
}
</script>

<template>
  <h1 class="titulo-categoria">Categoria</h1>

  <div class="categoria">
    <div class="form-section">
      <input
        type="text"
        v-model="categoria.descricao"
        placeholder="Descrição"
        class="input-field"
      />
      <button @click="salvar" class="btn salvar">Salvar</button>
      <button @click="limpar" class="btn limpar">Limpar</button>
    </div>

    <div class="list-section">
      <ul class="categoria-list">
        <li v-for="categoria in categorias" :key="categoria.id" class="categoria-item">
          <span @click="editar(categoria)" class="categoria-text">
            ({{ categoria.id }}) - {{ categoria.descricao }} -
          </span>
          <button @click="excluir(categoria.id)" class="btn-delete">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.categoria {
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
.titulo_categoria{
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

.categoria-list {
  list-style-type: none;
  padding: 0;
}

.categoria-item {
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

.categoria-item:hover {
  background-color: var(--hover-background-color);
  transform: translateY(-3px);
}

.categoria-text {
  flex-grow: 1;
  cursor: pointer;
  color: #000000;
  font-size: var(--font-size);
  transition: color 0.3s ease;
}

.categoria-text:hover {
  color:#817373;;
}

.btn-delete {
  margin-left: 10px;
}
</style>