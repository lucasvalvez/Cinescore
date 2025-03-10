package com.cinescore.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinescore.model.Feedback;
import com.cinescore.model.GenerosUsuario;
import com.cinescore.model.Titulo;
import com.cinescore.model.TitulosFavoritos;
import com.cinescore.model.Usuario;
import com.cinescore.repository.FeedbackRepository;
import com.cinescore.repository.GenerosUsuarioRepository;
import com.cinescore.util.ModeloContagemFeedback;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/feedback")
@Validated
@CrossOrigin(origins = "*")
public class FeedbackController {

	@Autowired
	private FeedbackRepository feedbackRepository;

	@PostMapping("/comentar")
	@CrossOrigin(origins = "*")
	public void comentar(@Valid @RequestBody Feedback feedback) {

		List<Feedback> lista = feedbackRepository.findAll();

		for (int i = 0; i < lista.size(); i++) {
			if (lista.get(i).getTituloId() == feedback.getTituloId()) {
				if (lista.get(i).getUsuarioId().equals(feedback.getUsuarioId())) {
					feedbackRepository.delete(lista.get(i));
				}
			}
		}

		feedbackRepository.save(feedback);

	}

	@GetMapping("/comentarios")
	@CrossOrigin(origins = "*")
	public List<String> getComentarios(@RequestParam int tituloId) {
		List<String> resposta = new ArrayList<>();

		List<Feedback> lista = feedbackRepository.findAll();

		for (int i = 0; i < lista.size(); i++) {
			if (!lista.get(i).getComentario().isBlank()) {
				if (lista.get(i).getTituloId() == tituloId) {
					resposta.add(lista.get(i).getComentario());
				}
			}

		}

		return resposta;
	}

	@GetMapping("/like")
	@CrossOrigin(origins = "*")
	public int getQuantidadeLike(@RequestParam int tituloId) {

		List<Feedback> lista = feedbackRepository.findAll();
		int resposta = 0;

		for (int i = 0; i < lista.size(); i++) {
			if (lista.get(i).getTituloId() == tituloId) {
				if (lista.get(i).isLike()) {
					resposta++;
				}
			}
		}

		return resposta;
	}

	@GetMapping("/deslike")
	@CrossOrigin(origins = "*")
	public int getQuantidadeDeslike(@RequestParam int tituloId) {
		List<Feedback> lista = feedbackRepository.findAll();
		int resposta = 0;

		for (int i = 0; i < lista.size(); i++) {
			if (lista.get(i).getTituloId() == tituloId) {
				if (!lista.get(i).isLike()) {
					resposta++;
				}
			}
		}

		return resposta;
	}

	@GetMapping("/titulosMaisCurtidos")
	@CrossOrigin(origins = "*")
	public List<Titulo> getTitulosMaisCurtidos() {

		boolean liberado = true;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();

		for (int i = 0; i < lista.size(); i++) {
			if (lista.get(i).isLike()) {

				liberado = true;

				for (int j = 0; j < listados.size(); j++) {
					if (lista.get(i).getTituloId() == listados.get(j).getId()) {
						listados.get(j).setQuantidade(listados.get(j).getQuantidade() + 1);
						liberado = false;
					}
				}

				if (liberado) {
					ModeloContagemFeedback x = new ModeloContagemFeedback();
					x.setId(lista.get(i).getTituloId());
					x.setQuantidade(1);
					x.setTipo(lista.get(i).getTipo());

					listados.add(x);
				}
			}
		}

		List<ModeloContagemFeedback> listagem = listados.stream()
				.sorted(Comparator.comparingInt(ModeloContagemFeedback::getQuantidade).reversed()).limit(10).toList();

		for (int i = 0; i < listagem.size(); i++) {
			Titulo x = new Titulo();
			x.setId(listados.get(i).getId());
			x.setTipo(listados.get(i).getTipo());
			x.setQtde(listados.get(i).getQuantidade());

			resposta.add(x);
		}

		return resposta;
	}

	@GetMapping("/titulosMenosCurtidos")
	@CrossOrigin(origins = "*")
	public List<Titulo> getTitulosMenosCurtidos() {

		boolean liberado = true;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();

		for (int i = 0; i < lista.size(); i++) {
			if (!lista.get(i).isLike()) {

				liberado = true;

				for (int j = 0; j < listados.size(); j++) {
					if (lista.get(i).getTituloId() == listados.get(j).getId()) {
						listados.get(j).setQuantidade(listados.get(j).getQuantidade() + 1);
						liberado = false;
					}
				}

				if (liberado) {
					ModeloContagemFeedback x = new ModeloContagemFeedback();
					x.setId(lista.get(i).getTituloId());
					x.setQuantidade(1);
					x.setTipo(lista.get(i).getTipo());

					listados.add(x);
				}
			}
		}

		List<ModeloContagemFeedback> listagem = listados.stream()
				.sorted(Comparator.comparingInt(ModeloContagemFeedback::getQuantidade).reversed()).limit(10).toList();

		for (int i = 0; i < listagem.size(); i++) {
			Titulo x = new Titulo();
			x.setId(listados.get(i).getId());
			x.setTipo(listados.get(i).getTipo());
			x.setQtde(listados.get(i).getQuantidade());

			resposta.add(x);
		}

		return resposta;
	}

	@GetMapping("/titulosMaisComentados")
	@CrossOrigin(origins = "*")
	public List<Titulo> getTitulosMaisComentados() {

		boolean liberado = true;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();

		for (int i = 0; i < lista.size(); i++) {
			if (!lista.get(i).getComentario().isBlank()) {
				liberado = true;

				for (int j = 0; j < listados.size(); j++) {
					if (lista.get(i).getTituloId() == listados.get(j).getId()) {
						listados.get(j).setQuantidade(listados.get(j).getQuantidade() + 1);
						liberado = false;
					}
				}

				if (liberado) {
					ModeloContagemFeedback x = new ModeloContagemFeedback();
					x.setId(lista.get(i).getTituloId());
					x.setQuantidade(1);
					x.setTipo(lista.get(i).getTipo());

					listados.add(x);
				}
			}
		}

		List<ModeloContagemFeedback> listagem = listados.stream()
				.sorted(Comparator.comparingInt(ModeloContagemFeedback::getQuantidade).reversed()).limit(10).toList();

		for (int i = 0; i < listagem.size(); i++) {
			Titulo x = new Titulo();
			x.setId(listados.get(i).getId());
			x.setTipo(listados.get(i).getTipo());
			x.setQtde(listados.get(i).getQuantidade());

			resposta.add(x);
		}

		return resposta;
	}

	@GetMapping("/indicadorComentario")
	@CrossOrigin(origins = "*")
	public String getIndicadorComentario() {

		boolean liberado = true;
		double quantidade = 0;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();
		
		for (int j = 0; j < lista.size(); j++) {
			if (!lista.get(j).getComentario().isBlank()) {
				quantidade++;
			}

		}

		return new DecimalFormat("##0.00").format((quantidade / lista.size()) * 100);
	}
	
	@GetMapping("/indicadorPorcentagemPositiva")
	@CrossOrigin(origins = "*")
	public String getPorcentagemPositiva() {

		boolean liberado = true;
		double quantidade = 0;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();
		
		for (int j = 0; j < lista.size(); j++) {
			if (lista.get(j).isLike()) {
				quantidade++;
			}

		}

		return new DecimalFormat("##0.00").format((quantidade / lista.size()) * 100);
	}
	
	@GetMapping("/indicadorPorcentagemNegativa")
	@CrossOrigin(origins = "*")
	public String getPorcentagemNegativa() {

		boolean liberado = true;
		double quantidade = 0;

		List<Titulo> resposta = new ArrayList();
		List<ModeloContagemFeedback> listados = new ArrayList();
		List<Feedback> lista = feedbackRepository.findAll();
		
		for (int j = 0; j < lista.size(); j++) {
			if (!lista.get(j).isLike()) {
				quantidade++;
			}

		}

		return new DecimalFormat("##0.00").format((quantidade / lista.size()) * 100);
	}

}
