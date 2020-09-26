fx_version 'adamant'
game 'gta5'

ui_page "nui/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"client.lua"
}

server_scripts {
	"@vrp/lib/utils.lua",
	"server.lua"
}

files {
	"nui/index.html",
	"nui/inicio.html",
	"nui/motos.html",
	"nui/import.html",
	"nui/possuidos.html",
	"nui/caminhoes.html",
	"nui/jquery.js",
	"nui/logo.png",
	"nui/css.css",
	"nui/images/*"
}