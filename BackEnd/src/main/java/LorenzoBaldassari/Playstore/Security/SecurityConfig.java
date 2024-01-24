package LorenzoBaldassari.Playstore.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
// Obbligatoria se vogliamo dichiarare su ogni singolo endpoint i permessi di accesso in base al ruolo tramite annotazioni @PreAuthorize
public class SecurityConfig {
//	@Autowired
//	private JWTAuthFilter jwtAuthFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		// Disabilitiamo alcuni comportamenti di default
		httpSecurity.formLogin(AbstractHttpConfigurer::disable);
		httpSecurity.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		httpSecurity.csrf(AbstractHttpConfigurer::disable);
		httpSecurity.cors(Customizer.withDefaults());
		// N.B. NON DIMENTICARE QUESTA RIGA SE SI VUOLE CONFIGURARE CORS CON UN BEAN CUSTOM

		// Aggiungiamo filtri custom
//		httpSecurity.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		// Aggiungere/Rimuovere regole di protezione su singoli endpoint
		// in maniera che venga/non venga richiesta l'autenticazione per accedervi
		httpSecurity.authorizeHttpRequests(request -> request.requestMatchers("/**").permitAll());
//
		return httpSecurity.build();
	}

	@Bean
	PasswordEncoder getPWEncoder() {
		return new BCryptPasswordEncoder(11);
		// 11 è il numero di ROUNDS, ovvero quante volte viene eseguito l'algoritmo. Ci serve per impostare la velocità di esecuzione
		// di BCrypt. Più è alto il numero, più lento sarà l'algoritmo, più sicure saranno le password. Di contro più è lento l'algoritmo
		// e peggiore sarà la User Experience. Bisogna trovare il giusto bilanciamento tra le 2.
		// 11 significa che l'algoritmo verrà eseguito 2^11 volte 2048 volte
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5501/", "http://127.0.0.1:5501/Home-Page.html"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		// Registro la configurazione CORS fatta su tutti gli endpoint della mia applicazione
		return source;
	}
}
