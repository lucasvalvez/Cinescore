package com.cinescore.model;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "TITULOS_FAVORITOS")
public class TitulosFavoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Id do usuario é obrigatório")
    @Column(name = "usuario_id_fk")
    private String usuarioId;

    @NotBlank(message = "Id do titulo é obrigatório")
    @Column(name = "api_titulo_id_fk")
    private String tituloId;

    @NotBlank(message = "tipo do titulo é obrigatório")
    @Column(name = "titulo_favorito_tipo")
    private String tipoTitulo;


    public TitulosFavoritos() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTituloId() {
        return tituloId;
    }

    public void setTituloId(String tituloId) {
        this.tituloId = tituloId;
    }

    public String getTipoTitulo() {
        return tipoTitulo;
    }

    public void setTipoTitulo(String tipoTitulo) {
        this.tipoTitulo = tipoTitulo;
    }


}
