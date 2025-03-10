package com.cinescore.model;

import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.*;

@Entity
@Table(name = "FEEDBACK")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long id;

    @NotBlank(message = "Id do usuario é obrigatório")
    @Column(name = "usuario_id_fk")
    private String usuarioId;

    @NotBlank(message = "Id do genero é obrigatório")
    @Column(name = "titulo_id_fk")
    private int tituloId;

    @Column(name = "feedback_like")
    private boolean like;

    @Column(name = "feedback_comentario")
    private String comentario;
    
    @Column(name = "feedback_tipo")
    private String tipo;

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

	public int getTituloId() {
		return tituloId;
	}

	public void setTituloId(int tituloId) {
		this.tituloId = tituloId;
	}

	public boolean isLike() {
		return like;
	}

	public void setLike(boolean like) {
		this.like = like;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

}
