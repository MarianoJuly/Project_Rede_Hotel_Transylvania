from ..serializers import ClienteSerializer
from ..models import Cliente
from rest_framework import status
from rest_framework.response import Response

def retornaCliente(id=0):
    if id != 0:    
        Clientes = Cliente.objects.filter(id = id)
        serializer = ClienteSerializer(Clientes, many=True)
        return Response(serializer.data)
            
    elif id == 0: 
        Clientes = Cliente.objects.all()
        serializer = ClienteSerializer(Clientes, many=True)
        return Response(serializer.data)

def salvaCliente(dataParam):
    serializer = ClienteSerializer(data=dataParam)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def deletaCliente(id):
    if id != 0:
        try:
            Clientes = Cliente.objects.get(id=id)
            Clientes.delete()
            return Response("ok")
        except Cliente.DoesNotExist:
            return Response("not ok")
        
    else:
        Clientes = Cliente.objects.all()
        Clientes.delete()
        return Response("deletados") 

def atualizaCliente(id, request):
    if id != 0:
        # Isso retorna um objeto único ou None
        cliente = Cliente.objects.filter(id=id).first()

        if cliente:
            cliente.nome = request.data.get('nome', cliente.nome)
            serializer = ClienteSerializer(cliente, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        
        return Response("Cliente não encontrado ou dados inválidos", status=404)

    return Response("ID inválido", status=400)    


