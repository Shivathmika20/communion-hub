"server only"

import { PinataSDK } from "pinata"

export const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjk1ZDlkOS03ZmNhLTRiOWQtOTBjMi1kMjkwODg5MTRhNzMiLCJlbWFpbCI6IjIxN3kxYTMzNDVAbWxyaXRtLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkMDM4YzEzN2YxMGExMDEzOGM3Iiwic2NvcGVkS2V5U2VjcmV0IjoiOGM2NjJlNWYzMmM3OGI0ZTBjYjQ2ZjJhYzEwMWQxYzczMjcwYzcxZWFhODMzNmEwODBkYjM1NGUwYWRhZDFkYSIsImV4cCI6MTc3MzQ3Nzg5N30.xWiCy3P4u2251imyhVIE7ig2QioncA4VK7-oaK6Ozd8"
  ,
  pinataGateway: "https://moccasin-worrying-aardvark-868.mypinata.cloud"
})