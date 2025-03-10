package com.cinescore.controller;

import com.cinescore.model.loginRequest;
import com.cinescore.model.TitulosFavoritos;
import com.cinescore.model.Usuario;
import com.cinescore.repository.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@Validated
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> createUsuario(@Valid @RequestBody Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().body("E-mail ja cadastrado.");
        }

        usuarioRepository.save(usuario);
        
        return ResponseEntity.ok("");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid loginRequest loginRequest) {
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail());
        if (usuario == null || (!loginRequest.getSenha().equals(usuario.getSenha())) ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro: Credenciais inválidas. ");
        }
    
        return ResponseEntity.ok("");
    }

    @PutMapping("/alterar")
    public ResponseEntity<String> updateUsuario(@Valid @RequestBody Usuario usuario,  @RequestParam String email) {
        Usuario usuario1 = usuarioRepository.findByEmail(email);

        Usuario usuario2 = new Usuario();
        usuario2.setDataNascimento(usuario1.getDataNascimento());
        usuario2.setEmail(email);
        usuario2.setNome(usuario.getNome());
        usuario2.setSenha(usuario.getSenha());


        usuarioRepository.delete(usuario1);   
        usuarioRepository.save(usuario2);     
        return ResponseEntity.ok("");
    }

    @GetMapping("/nome")
    public String getNome(@RequestParam String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario.getNome();
    }

    @GetMapping("/senha")
    public String getSenha(@RequestParam String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario.getSenha();
    }

    @GetMapping("/primeiraLetra")
    public String getPrimeiraLetra(@RequestParam String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return String.valueOf(usuario.getNome().charAt(0));
    }

    @DeleteMapping("/deletar")
    public void deletar(@RequestParam String email) {

        Usuario usuario = usuarioRepository.findByEmail(email);
        usuarioRepository.delete(usuario);
    }

}