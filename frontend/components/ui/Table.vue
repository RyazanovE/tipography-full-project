<template>
  <div class="styled-price-table">
    <table class="styled-table">
      <thead class="table-header">
        <tr class="header-row">
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="header-cell"
            :class="{ 'text-center': header.center }"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="body-row">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="body-cell"
            :class="{ 'highlight-cell': cell.bold }"
          >
            <template v-if="cell.type === 'links'">
              <div class="links-wrapper">
                <a 
                  v-for="(link, linkIndex) in cell.value" 
                  :key="linkIndex" 
                  :href="link.value"
                  class="download-link"
                >
                  {{ link.label }}
                </a>
              </div>
            </template>

            <template v-else>
              {{ cell.value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="info" class="table-info">
      <div v-if="info.title" class="info-title">{{ info.title }}</div>
      <div v-if="info.text" class="info-text">{{ info.text }}</div>

      <ul v-if="info.services && info.services.length" class="services-list">
        <li v-for="(service, idx) in info.services" :key="idx" class="service-item">
          {{ service }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  info: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.styled-price-table {
  width: 100%;
  margin: 20px 0;
  font-family: Arial, sans-serif;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  background-color: #3498db;
}

.header-row {
  border-bottom: 2px solid #2980b9;
}

.header-cell {
  padding: 15px 20px;
  color: white;
  font-weight: bold;
  text-align: left;
  font-size: 16px;

  &.text-center {
    text-align: center;
  }
}

.table-body {
  background-color: white;
}

.body-row {
  border-bottom: 1px solid #ecf0f1;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
}

.body-cell {
  padding: 15px 20px;
  color: #333;
  font-size: 15px;
  text-align: left;

  &.highlight-cell {
    font-weight: bold;
    color: #2c3e50;
  }
}

.links-wrapper {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.download-link {
  color: #3498db;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #3498db;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #3498db;
    color: white;
  }
}

.table-info {
  margin-top: 25px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.info-text {
  color: #333;
  line-height: 1.5;
  margin-bottom: 15px;
}

.services-list {
  list-style-type: none;
  padding-left: 0;
  margin-top: 10px;
}

.service-item {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
  color: #333;

  &::before {
    content: "•";
    color: #3498db;
    font-weight: bold;
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .header-cell,
  .body-cell {
    padding: 10px 15px;
    font-size: 14px;
  }

  .links-wrapper {
    gap: 8px;
  }

  .download-link {
    padding: 3px 6px;
    font-size: 13px;
  }
}
</style>