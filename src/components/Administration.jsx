import React from 'react';

const Administration = () => {

  return (
    <section className='format-style squad'>
    <article>
      <h1>Olá Mundo!!! <i className="fas fa-igloo" /></h1>
      <p>O objetivo deste HTML é ajudar a determinar as configurações normais (padrão) do estilo de texto e ter certeza de que todos os elementos HTML possíveis estão incluídos aqui, de modo a não perder quaisquer elementos ao projetar um site.</p>
      <hr />
      <h1>Cabeçalho 1</h1>
      <h2>Cabeçalho 2</h2>
      <h3>Cabeçalho 3</h3>
      <h4>Cabeçalho 4</h4>
      <h5>Cabeçalho 5</h5>
      <h6>Cabeçalho 6</h6>
      <hr />
      <h2>Paragrafo</h2>
      <p>Lorem ipsum dolor sit amet, <a href='/' title='test link'>test link</a> adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. <a href='/' title='test link'>Estilo de link</a>. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>
      <p>Lorem ipsum dolor sit amet, <em>Enfase</em> consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>
      <hr />
      <h2>Tipo de Lista</h2>
      <h3>Definição de lista</h3>
      <dl>
        <dt>Título da lista de definição</dt>
        <dd>Divisório da lista de definição.</dd>
      </dl>
      <h3>Lista Ordenada</h3>
      <ol>
        <li>Item de lista 1</li>
        <li>Item de lista 2</li>
        <li>Item de lista 3</li>
      </ol>
      <h3>Lista desordenada</h3>
      <ul>
        <li>Item de lista 1</li>
        <li>Item de lista 2</li>
        <li>Item de lista 3</li>
      </ul>
      <hr />
      <h2>Formulários</h2>
      <fieldset>
        <legend>Legenda</legend>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus.</p>
        <form>
          <h2>Elementos de formulários</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui.</p>
          <label>Campo de texto
            <input type='text'/>
          </label>
          <label>Área de Texto
            <textarea></textarea>
          </label>
          <label>Elemento de seleção
            <select>
              <optgroup label='Option Group 1'>
                <option value='1'>
                  Opção 1
                </option>
                <option value='2'>
                  Opção 2
                </option>
                <option value='3'>
                  Opção 3
                </option>
              </optgroup>
              <optgroup label='Option Group 2'>
                <option value='1'>
                  Opção 1
                </option>
                <option value='2'>
                  Opção 2
                </option>
                <option value='3'>
                  Opção 3
                </option>
              </optgroup>
            </select>
          </label>
          <label>Botões radio:</label>
          <label className='input-radio'>
            <input type='radio' className='radio' name='radio_button' value='radio_1' /> Radio 1
          </label>
          <label className='input-radio'>
            <input type='radio' className='radio' name='radio_button' value='radio_2' /> Radio 2
          </label>
          <label className='input-radio'>
            <input type='radio' className='radio' name='radio_button' value='radio_3' /> Radio 3
          </label>
          <label>Checkboxes:</label>
          <label className='input-checkbox'>
            <input type='checkbox' className='checkbox' name='checkboxes' value='check_1' /> Checkbox 1
          </label>
          <label className='input-checkbox'>
            <input type='checkbox' className='checkbox' name='checkboxes' value='check_2' /> Checkbox 2
          </label>
          <label className='input-checkbox'>
            <input type='checkbox' className='checkbox' name='checkboxes' value='check_3' /> Checkbox 3
          </label>
          <label>Senhas:
            <input type='password' className='password' name='password' />
          </label>
          <label>Campo de arquivo:
            <input type='file' className='file' name='file' />
          </label>
          <input className='button' type='reset' value='Limpar' />
          <input className='button' type='submit' value='Enviar' />
        </form>
      </fieldset>
      <hr />
      <h2>Tabelas</h2>
      <table cellSpacing='0' cellPadding='0'>
        <tbody>
          <tr>
            <th>Cabeçalho de tabela 1</th>
            <th>Cabeçalho de tabela 2</th>
            <th>Cabeçalho de tabela 3</th>
          </tr>
          <tr>
            <td>Divisão 1</td>
            <td>Divisão 2</td>
            <td>Divisão 3</td>
          </tr>
          <tr>
            <td>Divisão 1</td>
            <td>Divisão 2</td>
            <td>Divisão 3</td>
          </tr>
          <tr>
            <td>Divisão 1</td>
            <td>Divisão 2</td>
            <td>Divisão 3</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h2>Diversos – abbr, acronym, pre, code, sub, sup, etc.</h2>
      <p>Lorem <sup>Sobrescrito</sup> dolor <sub>subscrito</sub> amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. <cite>Cidade</cite>. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. <acronym title='Escreva seu titulo aqui'>Titulo no Hover</acronym> Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.  <abbr title='Abreviatura'>Abreviatura</abbr></p>
      <pre>
        Aqui, você pode copiar um texto e estes espaço 
        respeitará as quebras de linhas.
        Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit.
        Nullam dignissim convallis est.
        Quisque aliquam. Donec faucibus. 
        Nunc iaculis suscipit dui. 
        Nam sit amet sem. 
        Aliquam libero nisi, imperdiet at,
        tincidunt nec, gravida vehicula,
        nisl. 
        Praesent mattis, massa quis 
        luctus fermentum, turpis mi 
        volutpat justo, eu volutpat 
        enim diam eget metus. 
        Maecenas ornare tortor. 
        Donec sed tellus eget sapien
        fringilla nonummy. 
        <acronym title='National Basketball Association'>NBA</acronym> 
        Mauris a ante. Suspendisse
        quam sem, consequat at, 
        commodo vitae, feugiat in, 
        nunc. Morbi imperdiet augue
        quis tellus.  
        <abbr title='Avenue'>AVE</abbr>
      </pre>
      <blockquote>
        Esta folha de estilo vai ajuda-lo muito, diria, muitíssimo!
      </blockquote> 
      <p>-Blockquote</p>
    </article>
  </section>

  )
}

export default Administration

