<x-variables>
title = 'Home'
</x-variables>

# h1

h1 > p

## h2

h2 > p

## h2 - Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world,

h2 > p
Whereas disregard and contempt for human rights have resulted in barbarous acts which have outraged the conscience of mankind, and the advent of a world in which human beings shall enjoy freedom of speech and belief and freedom from fear and want has been proclaimed as the highest aspiration of the common people,

### h3

#### h4

##### h5

<section>
`pre &gt; code`:

```html
<details>
<hgroup>
    <h3>
        details &gt; hgroup &gt; h3
    </h3>
    <p>
    details &gt; hgroup &gt; :is(h1, h2, h3, h4, h5, h6) + *
    </p>
    <p>
    details &gt; hgroup &gt; :is(h1, h2, h3, h4, h5, h6) ~ *
    </p>
</hgroup>
</details>
```
</section>

<p>Yeah, we don't.</p>

###### h6

# Universal Declaration of Human Rights

(Poorly formatted version for demonstration purposes)

## Article 1

All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.

## Article 2

Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.

Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty.

## Article 11

1.  Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence.

2.  No one shall be held guilty of any penal offence on account of any act or omission which did not constitute a penal offence, under national or international law, at the time when it was committed. Nor shall a heavier penalty be imposed than the one that was applicable at the time the penal offence was committed.

## Article 13

### Everyone has:

the right to freedom of movement and residence within the borders of each State.

### Everyone has:

the right to leave any country, including their own, and to return to his country.

## Article 14

Everyone has the right to a nationality.

<section>
<p>Everyone has the right to seek and to enjoy in other countries asylum from persecution.</p>

<ol>
<li>
This right may not be invoked in the case of prosecutions genuinely arising from non-political crimes or from acts contrary to the purposes and principles of the United Nations.
</li>
</ol>
</section>

Article 15

No one shall be arbitrarily deprived of his nationality nor denied the right to change his nationality.

<section>
We don't correctly support this yet:

```html
<details>
<hgroup>
    <h3>
        details &gt; hgroup &gt; h3
    </h3>
    <p>
    details &gt; hgroup &gt; :is(h1, h2, h3, h4, h5, h6) + *
    </p>
    <p>
    details &gt; hgroup &gt; :is(h1, h2, h3, h4, h5, h6) ~ *
    </p>
</hgroup>
</details>
```
</section>
