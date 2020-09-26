-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONEXÃO
-----------------------------------------------------------------------------------------------------------------------------------------
src = {}
Tunnel.bindInterface("vrp_dealership",src)
vSERVER = Tunnel.getInterface("vrp_dealership")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIÁVEIS
-----------------------------------------------------------------------------------------------------------------------------------------
local dealerOpen = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEALERS
-----------------------------------------------------------------------------------------------------------------------------------------
local dealers = {
	--{ ['x'] = -1165.89, ['y'] = -1723.67, ['z'] = 11.8 }, BLIP NA PRAIA (N SEI PQ)
	--{ ['x'] = -1173.57, ['y'] = -1728.99, ['z'] = 11.8 }, BLIP NA PRAIA 2 (N SEI PQ)
	{ ['x'] = -30.03, ['y'] = -1104.67, ['z'] = 26.42 },
	{ ['x'] = -32.30, ['y'] = -1112.40, ['z'] = 26.42}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPEN DEALER
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5)
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) then
			local x,y,z = table.unpack(GetEntityCoords(ped))
			for k,v in pairs(dealers) do
				local distance = Vdist(x,y,z,v.x,v.y,v.z)
				if distance <= 10.5 then
					if distance <= 1.5 then
						DrawText3Ds(x,y,z,"~o~PRESSIONE  ~g~E ~o~PARA ABRIR O TABLET")
					end
					DrawMarker(21,v.x,v.y,v.z-0.6,0,0,0,0.0,0,0,0.5,0.5,0.4,255,0,0,50,0,0,0,1)
					if distance <= 1.5 and IsControlJustPressed(0,38) then
						SetNuiFocus(true,true)
						SendNUIMessage({ action = "showMenu" })
						dealerOpen = true
						vRP._CarregarObjeto("amb@code_human_in_bus_passenger_idles@female@tablet@idle_a","idle_b","prop_cs_tablet",49,28422)
					end
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTFOCUS
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	SetNuiFocus(false,false)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEALERCLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("dealerClose",function(data)
	SetNuiFocus(false,false)
	SendNUIMessage({ action = "hideMenu" })
	dealerOpen = false
	vRP._DeletarObjeto("amb@code_human_in_bus_passenger_idles@female@tablet@idle_a","idle_b","prop_cs_tablet",49,28422)
	vRP._stopAnim(false)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUESTCARROS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("requestCarros",function(data,cb)
	local veiculos = vSERVER.Carros()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUESTMOTOS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("requestMotos",function(data,cb)
	local veiculos = vSERVER.Motos()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUESTIMPORT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("requestImport",function(data,cb)
	local veiculos = vSERVER.Import()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------
-- REQUESTVIP
-----------------------------------------------------------------------

RegisterNUICallback("requestVIP",function(data,cb)
	local veiculos = vSERVER.VIP()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUESTCAMINHOES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("requestcaminhoes",function(data,cb)
	local veiculos = vSERVER.caminhoes()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUESTPOSSUIDOS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("requestPossuidos",function(data,cb)
	local veiculos = vSERVER.Possuidos()
	if veiculos then
		cb({ veiculos = veiculos })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BUYDEALER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("buyDealer",function(data)
	if data.name ~= nil then
		vSERVER.buyDealer(data.name)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SELLDEALER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("sellDealer",function(data)
	if data.name ~= nil then
		vSERVER.sellDealer(data.name)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- AUTO-UPDATE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dealership:Update")
AddEventHandler("dealership:Update",function(action)
	SendNUIMessage({ action = action })
end)


RegisterNetEvent("dealership:CloseTablet")
AddEventHandler("dealership:CloseTablet",function()
	SetNuiFocus(false,false)
	SendNUIMessage({ action = "hideMenu" })
	dealerOpen = false
	vRP._DeletarObjeto("amb@code_human_in_bus_passenger_idles@female@tablet@idle_a","idle_b","prop_cs_tablet",49,28422)
	vRP._stopAnim(false)
end)


function DrawText3Ds(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)

	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,150)
	SetTextEntry("STRING")
	SetTextCentre(1)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text))/370
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,80)
end