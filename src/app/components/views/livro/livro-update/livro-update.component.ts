import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent {
  id_cat: String = "";

  livro: Livro = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: "",
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    });
  }

  update(): void {
    this.service.update(this.livro).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem("Livro atualizado com sucesso!");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem(
          "Falha ao atualziar livro! Tente novamente mais tarde..."
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  getMessageTitulo() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres";
    }
    return false;
  }
  getMessageNomeDoAutor() {
    if (this.nome_autor.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
    }
    return false;
  }
  getMessageTexto() {
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2000000 caracteres";
    }
    return false;
  }
}
