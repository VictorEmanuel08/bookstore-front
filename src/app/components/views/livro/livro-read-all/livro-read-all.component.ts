import { Component } from "@angular/core";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent {
  id_cat: String = "";

  livros: Livro[] = [];

  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"];

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.findAll();
  }

  findAll() {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta;
    });
  }

  navegarParaCriarLivro(){
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
}
