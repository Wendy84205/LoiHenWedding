import urllib.request
BASE = "https://assets.cinelove.me/uploads/0f767b27-a71b-47a7-9e12-f4992f0c79f7"
IDS_404 = [
    "5be8a53d-9f26-452b-bafb-5d6e88300506.png",
    "67eb6223-57dc-49bb-857e-d22c39dd4e5a.jpeg",
    "f7915968-113e-450d-8666-6f48a7e96baa.jpeg",
    "8c7dba8c-f8bc-4cc7-910c-25de88451736.jpeg",
    "c2b3c7de-af53-4925-a1c7-ad2ec81488ec.jpeg",
    "cb3a050d-3475-4eb1-86ad-87bf9f79f113.jpeg",
    "d022fddf-f2f1-448f-afb3-cfa90b523c89.jpeg",
    "4831a463-674a-4c57-98be-b3917de8d6eb.jpeg",
]
VARIANTS = ["", "?crop=0,", "?crop=16,", "?w=500", "?v=1"]
for uid in IDS_404:
    got = []
    for v in VARIANTS:
        url = f"{BASE}/{uid}{v}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                data = r.read()
                got.append((v or "(none)", r.status, len(data)))
        except Exception as e:
            got.append((v or "(none)", f"ERR {e}", 0))
    print(uid[:8], got)
