
let json = {test:'aaa'};
export function index(){
  return {
    type: 'RECEIVE_DOC_ASST_INFO',
    json
  }
}