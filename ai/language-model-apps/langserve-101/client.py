from langserve import RemoteRunnable

remote_chain = RemoteRunnable("http://localhost:8000/chain/")
response = remote_chain.invoke({"language": "german", "text": "hi"})

print(response)