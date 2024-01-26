import http from "../http-common";

class DcService {
  getAll() {
    return http.get("/dc");
  }

  getByCategory(category) {
    return http.get("/dc?categ=${category}");
  }

  get(id) {
    return http.get(`/dc/${id}`);
  }

  /* Creation by backoffice*/
  create(data) {
    return http.post("/dc", data);
  }

  /*User save */
  update(id, data, isCompleted) {
    return http.put(`/dc/${id}?completed=${isCompleted}`, data);
  }

  searchByName(name) {
    return http.get(`/dc?name=${name}`);
  }

  searchByTag(tag) {
    return http.get(`/dc?tag=${tag}`);
  }
}

export default new DcService();
