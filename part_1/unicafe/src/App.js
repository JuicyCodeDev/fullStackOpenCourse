import { useState } from 'react'

const Headline = ({ heading }) => <h1>{heading}</h1>

const Button = (props) => {
  return (
      <button onClick = {props.handleClick}>
        {props.name}
      </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      {props.data}
    </div>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
      <tbody>
        <tr>
          <td><StatisticsLine data = "good"/></td>
          <td><StatisticsLine data = {props.good} /></td>
        </tr>
        <tr>
          <td><StatisticsLine data = "neutral" /></td>
          <td><StatisticsLine data = {props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticsLine data = "bad"/></td>
          <td><StatisticsLine data = {props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticsLine data = "all"/></td>
          <td><StatisticsLine data = {props.all} /></td>
        </tr>
        <tr>
          <td><StatisticsLine data = "average"/></td>
          <td><StatisticsLine data = {props.avg} /></td>
        </tr>
        <tr>
          <td><StatisticsLine data = "positive"/></td>
          <td><StatisticsLine data = {props.positive} /></td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const good_up = () => {
    setGood(good + 1);
    setAll(all + 1)
  }

  const neutral_up = () => {
    setNeutral(neutral + 1);
    setAll(all + 1)
  }

  const bad_up = () => {
    setBad(bad + 1);
    setAll(all + 1)
  }

  const calc_avg = () => {
    if (all == 0) return 0;
    return (good * 1 + bad * -1) / all
  }

  const calc_positive = () => {
    if (all == 0) return 0;
    return good / all * 100 + "%"
  }

  return (
    <div>
      <Headline heading = "give feedback" />
      <Button name = "good" handleClick = {good_up}/>
      <Button name = "neutral" handleClick = {neutral_up}/>
      <Button name = "bad" handleClick = {bad_up}/>
      <Headline heading = "statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} avg = {calc_avg()} positive = {calc_positive()}/>
    </div>
  )
    
}

export default App