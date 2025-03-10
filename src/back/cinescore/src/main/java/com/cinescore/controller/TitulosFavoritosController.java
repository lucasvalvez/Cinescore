package com.cinescore.controller;

import com.cinescore.model.loginRequest;
import com.cinescore.model.TitulosFavoritos;
import com.cinescore.model.Usuario;
import com.cinescore.repository.TitulosFavoritosRepository;
import com.cinescore.repository.UsuarioRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/titulosfavoritos")
@Validated
@CrossOrigin(origins = "*")
public class TitulosFavoritosController {

    @Autowired
    private TitulosFavoritosRepository titulosFavoritosRepository;

    @GetMapping("/listaFilmes")
    public List<String> listaFilmes(@RequestParam String email) {
        List<String> resposta = new ArrayList<>();

        List<TitulosFavoritos> lista = titulosFavoritosRepository.findAll();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(email)) {
                if(lista.get(i).getTipoTitulo().equals("movie")){
                    resposta.add(lista.get(i).getTituloId());   
                  }            
            }
        }      

        return resposta;
    }

    @GetMapping("/listaSeries")
    public List<String> listaSeries(@RequestParam String email) {
        List<String> resposta = new ArrayList<>();

        List<TitulosFavoritos> lista = titulosFavoritosRepository.findAll();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(email)) {
                if(lista.get(i).getTipoTitulo().equals("tv")){
                  resposta.add(lista.get(i).getTituloId());   
                }                              
            }
        }      

        return resposta;
    }

    @PostMapping("/gerenciar")
    public ResponseEntity<String> gerenciarTitulo(@Valid @RequestBody TitulosFavoritos titulo) {

        List<TitulosFavoritos> lista = titulosFavoritosRepository.findAll();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(titulo.getUsuarioId())) {
                if (lista.get(i).getTituloId().equals(titulo.getTituloId())) {
                    return deletaTituloFavorito(titulo);
                }
            }
        }

        titulosFavoritosRepository.save(titulo);

        return ResponseEntity.ok("");
    }

    public ResponseEntity<String> deletaTituloFavorito(TitulosFavoritos titulo) {

        List<TitulosFavoritos> lista = titulosFavoritosRepository.findAll();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(titulo.getUsuarioId())) {
                if (lista.get(i).getTituloId().equals(titulo.getTituloId())) {
                    titulosFavoritosRepository.delete(lista.get(i));
                    return ResponseEntity.ok("");
                }
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Favorito nao existe!");
    }

}