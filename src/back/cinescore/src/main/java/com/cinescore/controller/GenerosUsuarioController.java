package com.cinescore.controller;

import com.cinescore.model.loginRequest;
import com.cinescore.model.GenerosUsuario;
import com.cinescore.model.TitulosFavoritos;
import com.cinescore.model.Usuario;
import com.cinescore.repository.GenerosUsuarioRepository;
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
@RequestMapping("/api/generosUsuario")
@Validated
@CrossOrigin(origins = "*")
public class GenerosUsuarioController {

    @Autowired
    private GenerosUsuarioRepository GenerosUsuarioRepository;
    
    @DeleteMapping("/limpar")
    public void limpar(@Valid @RequestBody GenerosUsuario usuario) {

        List<GenerosUsuario> lista = GenerosUsuarioRepository.findAll();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(usuario.getUsuarioId())) {
                    GenerosUsuarioRepository.delete(lista.get(i));
            }
        }

    }

    @PostMapping("/salvar")
    public void gerenciarTitulo(@Valid @RequestBody GenerosUsuario usuario, @RequestParam String generos) {

        List<GenerosUsuario> lista = GenerosUsuarioRepository.findAll();
        String x[] = generos.split(",");

        List<Integer> z = new ArrayList();
        List<GenerosUsuario> temp = new ArrayList();

        for (int i = 0; i < x.length; i++) {
            if (!x[i].isEmpty()) {
                z.add(Integer.parseInt(x[i]));
            }
        }

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(usuario.getUsuarioId())) {

                for (int j = 0; j < z.size(); j++) {
                    if (lista.get(i).getGeneroId() == z.get(j)) {
                        GenerosUsuario y = new GenerosUsuario();

                        y.setGeneroId(lista.get(i).getGeneroId());
                        y.setQuantidade(lista.get(i).getQuantidade() + 1);
                        y.setUsuarioId(lista.get(i).getUsuarioId());

                        GenerosUsuarioRepository.save(y);
                        GenerosUsuarioRepository.delete(lista.get(i));
                        z.remove(j);
                        break;                        
                    }

                }

            }
        }

        for (int i = 0; i < z.size(); i++) {
            GenerosUsuario y = new GenerosUsuario();
            y.setQuantidade(1);
            y.setGeneroId(z.get(i));
            y.setUsuarioId(usuario.getUsuarioId());
            GenerosUsuarioRepository.save(y);
        }
        return;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/generoFavorito")
    public String generoFavorito(@RequestParam String email) {

        List<GenerosUsuario> lista = GenerosUsuarioRepository.findAll();

        List<Integer> pontos = new ArrayList<Integer>();
        

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(email)) {
                pontos.add(lista.get(i).getQuantidade());
            }
        }
        
        int maiorPonto = lista.get(0).getQuantidade();

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getQuantidade() > maiorPonto) {
                maiorPonto = lista.get(i).getQuantidade();
            }
        }

        for (int i = 0; i < lista.size(); i++) {
            if (lista.get(i).getUsuarioId().equals(email)) {
                if(lista.get(i).getQuantidade() == maiorPonto){
                    return String.valueOf(lista.get(i).getGeneroId());
                }
            }
        }

        return null;
    }

}