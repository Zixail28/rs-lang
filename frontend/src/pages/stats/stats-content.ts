import { userStatistic, getUserStatistic } from './script';
import { dataUser  } from "../../core/components/interfaces/interface";
import { getUserWords } from '../../core/components/api/api';

export const statsContent = async (userId: string) => {
	const userWords = await getUserWords(userId)
	let counter=0;
	userWords.map((word: { difficulty: string; })=>{
		if (word.difficulty == 'learned') counter++;
	})

	const newUserStats = (await getUserStatistic(userId)).optional;
	let totalP  = 0;
	if(!newUserStats.sprintPercent && newUserStats.audiocallPercent) totalP = newUserStats.audiocallPercent;
	else if(newUserStats.sprintPercent && !newUserStats.audiocallPercent) totalP = newUserStats.sprintPercent;
	else if(newUserStats.sprintPercent && newUserStats.audiocallPercent) totalP = (+newUserStats.audiocallPercent + +newUserStats.sprintPercent)/2;
	return `<div class="stats">
<div class="stats-container container">
	<div class="title">
		<p class="stats-title">Статистика</p>
	</div>
	<div class="stats-box">
		<div class="games-stats-box">
			<div class="audiocall-box">
				<svg class="uk-flag" width="205" height="205" viewBox="0 0 205 205" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_20_254)">
					<path d="M40.9713 162.819L180.026 114.728C181.422 114.245 182.161 112.725 181.678 111.329L150.778 21.9836C150.295 20.5871 148.776 19.8485 147.379 20.3314L8.29543 68.4324C6.89894 68.9154 6.16035 70.4349 6.64331 71.8314L37.5529 161.206C38.0553 162.563 39.5748 163.302 40.9713 162.819Z" fill="#41479B"/>
					<path d="M6.65246 71.7617C6.17977 70.3949 6.89892 68.9154 8.2657 68.4427L19.3782 64.5995L75.8327 78.8405L65.4027 48.6823L90.2424 40.0918L100.672 70.2499L136.297 24.1643L147.409 20.3212C148.776 19.8485 150.255 20.5676 150.728 21.9344L152.948 28.3523L122.41 67.8884L161.898 54.2318L170.488 79.0714L131.001 92.728L179.439 104.951L181.658 111.369C182.131 112.736 181.412 114.215 180.045 114.688L168.933 118.531L112.478 104.29L122.908 134.448L98.0684 143.039L87.659 112.94L52.0643 159.015L40.9519 162.859C39.5851 163.331 38.1055 162.612 37.6328 161.245L35.4133 154.827L65.9509 115.291L26.4334 128.958L17.8428 104.119L57.3306 90.462L8.8823 78.2093L6.65246 71.7617Z" fill="#F5F5F5"/>
					<path d="M19.5488 109.051L84.1436 86.7113L70.3946 46.956L85.2806 41.8078L99.0296 81.5631L163.624 59.2235L168.783 74.1392L104.188 96.4787L117.927 136.204L103.041 141.352L89.3021 101.627L24.7072 123.966L19.5488 109.051Z" fill="#FF4B55"/>
					<path d="M120.166 96.5084L181.722 111.746C181.955 112.996 181.303 114.286 180.026 114.728L176.609 115.91L111.004 99.6436L120.156 96.4787L120.166 96.5084Z" fill="#FF4B55"/>
					<path d="M73.0419 112.806L82.1637 109.651L40.6936 162.881C39.4046 163.194 38.0644 162.493 37.6226 161.216L36.9136 159.165L73.0419 112.806Z" fill="#FF4B55"/>
					<path d="M151.684 24.6978L116.389 70.0042L107.267 73.1588L148.531 20.1993C149.527 20.2876 150.419 20.9437 150.768 21.9539C150.738 21.9642 151.684 24.6978 151.684 24.6978Z" fill="#FF4B55"/>
					<path d="M68.3437 86.62L6.59775 71.3149C6.40498 70.0842 7.07722 68.8537 8.29543 68.4324L11.8609 67.1993L77.4357 83.4757L68.3437 86.62Z" fill="#FF4B55"/>
					<path d="M196.26 145.606C199.35 144.538 200.983 141.179 199.914 138.089L157.003 14.0094C155.954 10.9788 152.625 9.3358 149.565 10.3942L149.535 10.4045C146.445 11.4732 144.812 14.8322 145.881 17.9223L188.772 141.942C189.841 145.032 193.2 146.665 196.26 145.606Z" fill="#2E3033"/>
					</g>
					<defs>
					<clipPath id="clip0_20_254">
					<rect width="161" height="161" fill="white" transform="matrix(-0.945077 0.326847 0.326847 0.945077 152.157 0)"/>
					</clipPath>
					</defs>
					</svg>
				<p class="audiocall-title">Аудиовызов</p>


				<div class="audiocall-information-box">
					<div class="row">
						<div class="text-information">Количество новых слов:</div>
						<div class="value-information aud-count-nw">${newUserStats.audiocallwordsPerDay}</div>
					</div>
					<div class="row">
						<div class="text-information">Процент правильных ответов:</div>
						<div class="value-information aud-correct-ans">${newUserStats.audiocallPercent} %</div>
					</div>
					<div class="row">
						<div class="text-information">Самая длинная серия правильных ответов:</div>
						<div class="value-information aud-most-leng">${newUserStats.audiocallSeries}</div>
					</div>
				</div>


			</div>
			<div class="sprint-box">
				<p class="sprint-title">Спринт</p>
				
				<div class="sprint-information-box">
					<div class="row">
						<div class="text-information">Количество новых слов:</div>
						<div class="value-information spr-count-nw">${newUserStats.sprintwordsPerDay}</div>
					</div>
					<div class="row">
						<div class="text-information">Процент правильных ответов:</div>
						<div class="value-information spr-correct-ans">${newUserStats.sprintPercent} %</div>
					</div>
					<div class="row">
						<div class="text-information">Самая длинная серия правильных ответов:</div>
						<div class="value-information spr-most-leng">${newUserStats.sprintSeries}</div>
					</div>
				</div>

			</div>
		</div>
		<div class="general-stats-box">
			<p class="general-stats-title">Общая статистика</p>

			<div class="general-stats-information-box">
				<div class="row">
					<div class="text-information">Количество новых слов:</div>
					<div class="value-information gs-count-nw">${newUserStats.audiocallwordsPerDay+newUserStats.sprintwordsPerDay}</div>
				</div>
				<div class="row">
					<div class="text-information">Количество изученных слов:</div>
					<div class="value-information gs-count-lw">${counter}</div>
				</div>
				<div class="row">
					<div class="text-information">Процент правильных ответов:</div>
					<div class="value-information gs-correct-ans">${totalP} %</div>
				</div>
			</div>

		</div>
	</div>
</div>
</div>`;}