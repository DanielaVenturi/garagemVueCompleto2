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
<template>
<div class="titulo-marca">
  <h1>Marca</h1>
</div>
  
 <div class="marca">
 <div class="form-section">
    <div class="form">
    <input type="text" v-model="marca.nome" placeholder="nome" class="input-field" />
    <input type="text" v-model="marca.nacionalidade" placeholder="nacionalidade" class="input-field" />
    <button @click="salvar" class="btn salvar">Salvar</button>
    <button @click="limpar" class="btn limpar">Limpar</button>
  </div>
 </div>
<div class="list-section">
  <ul class="marca-list">
    <li v-for="marca in marcas" :key="marca.id" class="marca-item">
      <span @click="editar(marca)" class="marca-text">
        ({{ marca.id }}) - {{ marca.nome.toUpperCase() }} - {{ marca.nacionalidade }}
      </span>
      <button @click="excluir(marca.id)" class="btn-delete">x</button>
    </li>
  </ul>
</div>
 </div>
</template>



<style scoped>
.marca{
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
  background-color: aliceblue;
}

.btn {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.titulo-marca{
  font-size: 15px;
  text-align: center;
}
.btn.salvar {
  background-color: #000000;
  color: white;
}

.btn.salvar:hover {
  background-color: #365a33;
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
  color: #000000;
  font-size: var(--font-size);
    transition: color 0.3s ease;
    background-color: aliceblue;
    border-radius: 4px;
    padding: 10px;

}

.marca-text:hover {
   color:#817373;
}

.btn-delete {
  margin-left: 10px;
}
@media (max-width: 978px) {
  .marca {
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
  .titulo_categoria {
    font-size: 20px;
  }
} 
@media (max-width:820px) {
  .categoria{
    grid-template-columns: 1fr;
    width: 75%;
  }
}
</style>
