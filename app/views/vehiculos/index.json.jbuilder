json.array!(@vehiculos_principal) do |vehiculo_principal|
  json.marca vehiculo_principal.marca.nombre
  json.modelo vehiculo_principal.modeloCustom
  json.marca_modelo vehiculo_principal.marca.nombre + ' ' + vehiculo_principal.modeloCustom
  json.titulo vehiculo_principal.titulo
end
json.array!(@vehiculos) do |vehiculo|
  json.marca vehiculo.marca.nombre
  json.modelo vehiculo.modeloCustom
  json.marca_modelo vehiculo.marca.nombre + ' ' + vehiculo.modeloCustom
  json.titulo vehiculo.titulo
end
