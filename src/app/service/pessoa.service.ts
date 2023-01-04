import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private base_url = environment.BASE_URL;
  private endpoint_tipo_pessoa = this.base_url.concat(environment.ENDPOINT_TIPO_PESSOA);

  constructor (
    private httpClient: HttpClient
  ) { }

  public findAllTipoPessoa() : Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint_tipo_pessoa);
  }

  public saveOnePessoa(pessoaRequestDTO: any) : Observable<any> {
    return this.httpClient.post<any>(this.base_url.concat(environment.ENDPOINT_PESSOA), pessoaRequestDTO);
  }

}
